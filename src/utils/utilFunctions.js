import Multimap from 'multimap';
import { getCommitBranch } from '../services/bitBucketServices.js';
import { convertBitBucketServerToOctane } from './jsonConverter.js';

export async function groupCommitsByBranch(commits) {
  let map = new Multimap();
  for (const commit of commits) {
    map.set(
      (await getCommitBranch(commit.id))[0].displayId,
      await convertBitBucketServerToOctane(commit)
    );
  }
  return map;
}
