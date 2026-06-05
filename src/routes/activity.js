import express from 'express';
import { PrismaClient } from '@prisma/client';
import { BskyAgent } from '@atproto/api';
import { requireAuth } from '../middleware/requireAuth.js';
import { DateTime } from 'luxon';

const router = express.Router();
const prisma = new PrismaClient();

function getStartOfTodayIsrael() {
  return DateTime.now().setZone('Asia/Jerusalem').startOf('day').toJSDate();
}

// REFRESH ACTIVITY (Sync & Apply Caps)
router.get('/refreshActivity', requireAuth, async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user.bskyHandle) {
      return res.status(400).json({ error: 'Please link a Bluesky handle to your account first.' });
    }

    const agent = new BskyAgent({ service: 'https://bsky.social' });
    await agent.login({
      identifier: process.env.BSKY_SERVICE_HANDLE,
      password: process.env.BSKY_SERVICE_PASSWORD,
    });

    let targetUserDid;
    try {
      const { data: profile } = await agent.resolveHandle({ handle: user.bskyHandle });
      targetUserDid = profile.did;
    } catch (e) {
      return res.status(404).json({ error: 'Could not find that Bluesky handle.' });
    }

    const cutoffTime = getStartOfTodayIsrael();
    const newActivity = { posts: [], replies: [], likes: [] };

    // FETCH FEED (Posts & Replies)
    let feedCursor;
    let fetchingFeed = true;
    while (fetchingFeed) {
      try {
        const { data } = await agent.getAuthorFeed({ actor: targetUserDid, limit: 50, cursor: feedCursor });
        if (!data.feed || data.feed.length === 0) break;

        for (const item of data.feed) {

          if (item.reason && item.reason.$type === 'app.bsky.feed.defs#reasonRepost') continue;

          const activityDate = new Date(item.post.record.createdAt);
          if (activityDate < cutoffTime) { fetchingFeed = false; break; }

          const bskyUri = item.post.uri;
          const text    = item.post.record.text;

          if (item.post.record.reply) {
            // item.post.record.reply.parent.uri = at://did:.../app.bsky.feed.post/xxx
            const parentAuthorDid = item.post.record.reply.parent.uri.split('/')[2];
            // Only reward replies directed at OTHER users, not self-replies
            if (parentAuthorDid && parentAuthorDid !== targetUserDid) {
              newActivity.replies.push({ date: activityDate, bskyUri, text });
            }
          } else {
            newActivity.posts.push({ date: activityDate, bskyUri, text });
          }
        }
        feedCursor = data.cursor;
        if (!feedCursor) fetchingFeed = false;
      } catch (err) { fetchingFeed = false; }
    }

    // FETCH LIKES (PDS Direct Routing)
    try {
      const plcRes  = await fetch(`https://plc.directory/${targetUserDid}`);
      const didDoc  = await plcRes.json();
      const pdsUrl  = didDoc.service.find(s => s.id === '#atproto_pds').serviceEndpoint;

      const pdsAgent   = new BskyAgent({ service: pdsUrl });
      let likesCursor;
      let fetchingLikes = true;
      let pagesScanned  = 0;

      while (fetchingLikes && pagesScanned < 5) {
        pagesScanned++;
        const { data } = await pdsAgent.com.atproto.repo.listRecords({
          repo: targetUserDid, collection: 'app.bsky.feed.like',
          limit: 50, cursor: likesCursor, reverse: true,
        });
        if (!data.records || data.records.length === 0) break;

        for (const record of data.records) {
          const likeDate = new Date(record.value.createdAt);
          if (likeDate >= cutoffTime) {

            const likedPostUri       = record.value.subject.uri;
            const likedPostAuthorDid = likedPostUri.split('/')[2];

            if (likedPostAuthorDid !== targetUserDid) {
              newActivity.likes.push({ date: likeDate, bskyUri: likedPostUri });
            }
          }
        }
        likesCursor = data.cursor;
        if (!likesCursor) fetchingLikes = false;

        const newest = new Date(data.records[0].value.createdAt);
        const oldest = new Date(data.records[data.records.length - 1].value.createdAt);
        if (newest >= oldest && newest < cutoffTime) break;
      }
    } catch (err) { console.error('Likes fetch error:', err.message); }

    // PROCESS & SAVE TO DATABASE
    newActivity.posts.reverse();
    newActivity.replies.reverse();
    newActivity.likes.reverse();

    // Current counts for today to enforce daily caps
    let todayPostsCount   = await prisma.userPost.count({  where: { userId, createdAt: { gte: cutoffTime } } });
    let todayRepliesCount = await prisma.userReply.count({ where: { userId, createdAt: { gte: cutoffTime } } });
    let todayLikesCount   = await prisma.userLike.count({  where: { userId, createdAt: { gte: cutoffTime } } });

    let newCoinsEarned = 0;

    // Process Posts (Max 5/day = 50 coins)
    for (const post of newActivity.posts) {
      const exists = await prisma.userPost.findUnique({ where: { bskyUri: post.bskyUri } });
      if (!exists) {
        const status = (todayPostsCount >= 5) ? 'cap_hit' : 'available';
        todayPostsCount++;
        await prisma.userPost.create({
          data: { userId, text: post.text, bskyUri: post.bskyUri, status, createdAt: post.date }
        });
        if (status === 'available') newCoinsEarned += 10;
      }
    }

    // Process Replies (Max 25/day = 25 coins)
    for (const reply of newActivity.replies) {
      const exists = await prisma.userReply.findUnique({ where: { bskyUri: reply.bskyUri } });
      if (!exists) {
        const status = (todayRepliesCount >= 25) ? 'cap_hit' : 'available';
        todayRepliesCount++;
        await prisma.userReply.create({
          data: { userId, text: reply.text, bskyUri: reply.bskyUri, status, createdAt: reply.date }
        });
        if (status === 'available') newCoinsEarned += 1;
      }
    }

    // Process Likes (Max 25/day = 25 coins)
    for (const like of newActivity.likes) {
      const exists = await prisma.userLike.findUnique({ where: { bskyUri: like.bskyUri } });
      if (!exists) {
        const status = (todayLikesCount >= 25) ? 'cap_hit' : 'available';
        todayLikesCount++;
        await prisma.userLike.create({
          data: { userId, bskyUri: like.bskyUri, status, createdAt: like.date }
        });
        if (status === 'available') newCoinsEarned += 1;
      }
    }

    // UPDATE USER BALANCES
    const trueEarnedPosts   = await prisma.userPost.count({  where: { userId, status: { in: ['available', 'claimed'] }, createdAt: { gte: cutoffTime } } }) * 10;
    const trueEarnedReplies = await prisma.userReply.count({ where: { userId, status: { in: ['available', 'claimed'] }, createdAt: { gte: cutoffTime } } }) * 1;
    const trueEarnedLikes   = await prisma.userLike.count({  where: { userId, status: { in: ['available', 'claimed'] }, createdAt: { gte: cutoffTime } } }) * 1;

    await prisma.user.update({
      where: { id: userId },
      data: {
        totalEarned:           { increment: newCoinsEarned },
        availableEarnings:     { increment: newCoinsEarned },
        earnedTodayFromPosts:   trueEarnedPosts,
        earnedTodayFromReplies: trueEarnedReplies,
        earnedTodayFromLikes:   trueEarnedLikes,
      }
    });

    res.status(200).json({ success: true, newCoins: newCoinsEarned });

  } catch (error) {
    console.error('Refresh Activity Error:', error);
    res.status(500).json({ error: 'Failed to sync Bluesky activity' });
  }
});

// GET ACTIVITY (Dashboard Data)
router.get('/getActivity', requireAuth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const startOfTodayIsrael = getStartOfTodayIsrael();

    const user = await prisma.user.findUnique({ where: { id: userId } });

    const postsCount   = await prisma.userPost.count({  where: { userId, createdAt: { gte: startOfTodayIsrael } } });
    const repliesCount = await prisma.userReply.count({ where: { userId, createdAt: { gte: startOfTodayIsrael } } });
    const likesCount   = await prisma.userLike.count({  where: { userId, createdAt: { gte: startOfTodayIsrael } } });

    const earnedPosts   = await prisma.userPost.count({  where: { userId, status: { in: ['available', 'claimed'] }, createdAt: { gte: startOfTodayIsrael } } }) * 10;
    const earnedReplies = await prisma.userReply.count({ where: { userId, status: { in: ['available', 'claimed'] }, createdAt: { gte: startOfTodayIsrael } } }) * 1;
    const earnedLikes   = await prisma.userLike.count({  where: { userId, status: { in: ['available', 'claimed'] }, createdAt: { gte: startOfTodayIsrael } } }) * 1;

    if (
      user.earnedTodayFromPosts   !== earnedPosts   ||
      user.earnedTodayFromReplies !== earnedReplies ||
      user.earnedTodayFromLikes   !== earnedLikes
    ) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          earnedTodayFromPosts:   earnedPosts,
          earnedTodayFromReplies: earnedReplies,
          earnedTodayFromLikes:   earnedLikes,
        }
      });
    }

    // Fetch activity log — each table knows its own type, so tag them at query time
    const posts   = (await prisma.userPost.findMany({  where: { userId }, orderBy: { createdAt: 'desc' }, take: 25 }))
                      .map(r => ({ ...r, _type: 'post' }));
    const replies = (await prisma.userReply.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 25 }))
                      .map(r => ({ ...r, _type: 'reply' }));
    const likes   = (await prisma.userLike.findMany({  where: { userId }, orderBy: { createdAt: 'desc' }, take: 25 }))
                      .map(r => ({ ...r, _type: 'like' }));

    const rawActivity = [...posts, ...replies, ...likes]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 50);

    const formattedActivity = rawActivity.map(item => {
      let type, coins, text;
      if (item._type === 'post') {
        type = 'post'; coins = 10; text = `"${item.text}"`;
      } else if (item._type === 'reply') {
        type = 'sent'; coins = 1; text = `Replied: "${item.text}"`;
      } else {
        type = 'like'; coins = 1; text = 'Liked a post';
      }

      const dt       = DateTime.fromJSDate(item.createdAt).setZone('Asia/Jerusalem');
      const isToday  = item.createdAt >= startOfTodayIsrael;
      const dateLabel = isToday ? 'Today' : dt.toFormat('MMM d');

      const statusFormat = item.status === 'cap_hit' ? 'capped'
                         : item.status === 'claimed'  ? 'claimed'
                         : 'available';

      return {
        id:     item.id,
        type:   type,
        text:   text,
        time:   `${dateLabel} ${dt.toFormat('h:mm a')}`,
        coins:  statusFormat === 'capped' ? 0 : coins,
        status: statusFormat,
      };
    });

    const totalEarnedToday = earnedPosts + earnedReplies + earnedLikes;

    res.status(200).json({
      stats: {
        totalEarned:    user.totalEarned,
        earnedToday:    totalEarnedToday,
        availableCoins: user.availableEarnings,
        claimedCoins:   user.claimedEarnings,
      },
      limits: {
        posts:   postsCount,
        replies: repliesCount,
        likes:   likesCount,
      },
      activityLog: formattedActivity,
    });

  } catch (error) {
    console.error('Get Activity Error:', error);
    res.status(500).json({ error: 'Failed to load dashboard data' });
  }
});

export default router;
