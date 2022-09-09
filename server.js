import { config } from 'dotenv';
import { buildCommitOctaneJson } from './src/utils/jsonConverter.js';
import { groupCommitsByBranch } from './src/utils/utilFunctions.js';
import { getCommits } from './src/services/bitBucketServices.js';

config();

async function main() {
  buildCommitOctaneJson(await groupCommitsByBranch(await getCommits()));
}

main();
