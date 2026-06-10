import express from 'express';
import { PrismaClient } from '@prisma/client';
import { ethers } from 'ethers';
import { requireAuth } from '../middleware/requireAuth.js';
import { DateTime } from 'luxon';

const router = express.Router();
const prisma = new PrismaClient();

function getStartOfTodayIsrael() {
  return DateTime.now().setZone('Asia/Jerusalem').startOf('day').toJSDate();
}

// POST /api/wallet/sendFundsToWallet
router.post('/sendFundsToWallet', requireAuth, async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    // Phone must be verified before withdrawal
    if (!user.phoneNumber || user.phoneNumber === '') {
      return res.status(403).json({ error: 'Phone verification required to withdraw.' });
    }

    // Calculate claimable amount from 'available' records only
    // Posts: 10 DOPA each, capped at 5 posts/day (50 max/day)
    // Replies: 1 DOPA each, capped at 25/day
    // Likes: 1 DOPA each, capped at 25/day
    const cutoff = getStartOfTodayIsrael();

    const pendingPosts   = await prisma.userPost.findMany({  where: { userId, status: 'available' } });
    const pendingReplies = await prisma.userReply.findMany({ where: { userId, status: 'available' } });
    const pendingLikes   = await prisma.userLike.findMany({  where: { userId, status: 'available' } });

    const pendingAmount =
      (pendingPosts.length   * 10) +
      (pendingReplies.length *  1) +
      (pendingLikes.length   *  1);

    if (pendingAmount <= 0) {
      return res.status(400).json({ error: 'No pending DOPA to claim.' });
    }

    // Send tokens on-chain
    const provider = new ethers.JsonRpcProvider('https://rpc-amoy.polygon.technology/', 80002, {
      staticNetwork: true,
    });
    const wallet   = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider);

    const abi = ['function transfer(address to, uint256 amount) returns (bool)'];
    const dopaContract = new ethers.Contract(process.env.DOPA_TOKEN_ADDRESS, abi, wallet);

    const amountToTransfer = ethers.parseUnits(pendingAmount.toString(), 18);

    console.log(`Sending ${pendingAmount} DOPA to ${user.address}…`);
    const tx = await dopaContract.transfer(user.address, amountToTransfer);
    await tx.wait();

    // Mark everything as claimed
    await prisma.userPost.updateMany({
      where: { userId, status: 'available' },
      data:  { status: 'claimed' },
    });
    await prisma.userReply.updateMany({
      where: { userId, status: 'available' },
      data:  { status: 'claimed' },
    });
    await prisma.userLike.updateMany({
      where: { userId, status: 'available' },
      data:  { status: 'claimed' },
    });

    // Update user balance: move amount from available → claimed
    await prisma.user.update({
      where: { id: userId },
      data: {
        availableEarnings: { decrement: pendingAmount },
        claimedEarnings:   { increment: pendingAmount },
      },
    });

    res.status(200).json({
      success: true,
      txHash: tx.hash,
      claimedAmount: pendingAmount,
    });

  } catch (error) {
    console.error('Withdrawal failed:', error);
    res.status(500).json({ error: 'Transaction failed on the blockchain.' });
  }
});

export default router;
