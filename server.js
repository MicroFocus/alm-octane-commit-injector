/*
 * (c) Copyright 2022 Micro Focus or one of its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
import log from './src/config/loggerConfig.js';

const groupCommitsByBranch = async (commits) => {
  let map = new Multimap();
  for (const commit of commits) {
    const changes = await getCommitContent(commit.id);
    map.set(
      (await getCommitBranch(commit.id))[0].displayId,
      await convertBitBucketServerToOctane(commit, changes)
    );
  }
  return map;
};

putOctaneCommits(
  await buildCommitOctaneJson(await groupCommitsByBranch(await getCommits()))
)
  .then((nrOfSentCommits) =>
    log.debug(`${nrOfSentCommits} commits have been sent to ALM Octane`)
  )
  .catch((err) => log.error('Something went wrong\n' + err.message));
