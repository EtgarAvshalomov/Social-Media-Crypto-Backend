import { PrismaClient } from '@prisma/client';
import { performance } from 'node:perf_hooks';

const prisma = new PrismaClient();

async function runBenchmark() {
  console.log('🚀 Starting Supabase Latency Check...');

  try {
    // --- Test 1: Cold Start (Handshake + Prisma Engine Init) ---
    const startCold = performance.now();
    const userCold = await prisma.user.findFirst();
    const endCold = performance.now();
    
    console.log(`⏱️  First Query (Cold): ${(endCold - startCold).toFixed(2)}ms`);

    // --- Test 2: Warm Start (Existing connection) ---
    const startWarm = performance.now();
    await prisma.user.findFirst();
    const endWarm = performance.now();

    console.log(`⏱️  Second Query (Warm): ${(endWarm - startWarm).toFixed(2)}ms`);

    if (!userCold) {
      console.log('⚠️  Note: Query succeeded but returned no data (User table is empty).');
    }

  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

runBenchmark();