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
import { putOctaneCommits } from './src/services/octaneServices.js';
import log from "./src/config/loggerConfig.js";



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

putOctaneCommits(
  await buildCommitOctaneJson(await groupCommitsByBranch(await getCommits()))
)
  .then((nrOfSentCommits) =>
    log.debug(`${nrOfSentCommits} commits have been sent to ALM Octane`)
  )
  .catch((err) => log.error('Something went wrong\n' + err.message));
