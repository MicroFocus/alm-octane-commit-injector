import { config } from 'dotenv';
import {
  buildCommitOctaneJson,
  convertBitBucketServerToOctane,
} from './src/utils/jsonConverter.js';
import {
  getCommitBranch,
  getCommitContent,
  getCommits,
} from './src/services/bitBucketServices.js';
import Multimap from 'multimap';

config();

async function groupCommitsByBranch(commits) {
  let map = new Multimap();
  for (const commit of commits) {
    const changes = await getCommitContent(commit.id);
    map.set(
      (await getCommitBranch(commit.id))[0].displayId,
      await convertBitBucketServerToOctane(commit, changes)
    );
  }
  return map;
}

async function main() {
  await buildCommitOctaneJson(await groupCommitsByBranch(await getCommits()));
}

main();
