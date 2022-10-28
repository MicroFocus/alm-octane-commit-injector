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
  getBranches,
  getCommitContent,
  getCommits,
  getCommitById,
} from './src/services/bitBucketServices.js';
import {
  getOctaneBuild,
  putOctaneCommits,
} from './src/services/octaneServices.js';
import log from './src/config/loggerConfig.js';
import configs from './src/config/config.js';

const getConfigBranches = async () => {
  const branches = [];
  (await getBranches()).forEach((branch) => branches.push(branch.displayId));
  if (configs.bitBucketBranches === '') return branches;
  else {
    const configBranches = [];
    configs.bitBucketBranches.split(';').forEach((branch) => {
      if (branches.includes(branch)) configBranches.push(branch);
    });
    return configBranches;
  }
};

const groupCommitsByBranch = async () => {
  const branches = await getConfigBranches();
  const untilCommitTimestamp =
    configs.bitBucketUntil !== ''
      ? (await getCommitById(configs.bitBucketUntil)).committerTimestamp
      : undefined;
  const sinceCommitTimestamp =
    configs.bitBucketSince !== ''
      ? (await getCommitById(configs.bitBucketSince)).committerTimestamp
      : undefined;
  for (const branch of branches) {
    const commits = await getCommits(branch);
    const convertedCommits = [];
    for (const commit of commits) {
      if (
        (untilCommitTimestamp === undefined &&
          sinceCommitTimestamp === undefined) ||
        (new Date(commit.committerTimestamp) <=
          new Date(untilCommitTimestamp) &&
          new Date(commit.committerTimestamp) >=
            new Date(sinceCommitTimestamp)) ||
        (new Date(commit.committerTimestamp) <=
          new Date(untilCommitTimestamp) &&
          sinceCommitTimestamp === undefined) ||
        (new Date(commit.committerTimestamp) >=
          new Date(sinceCommitTimestamp) &&
          untilCommitTimestamp === undefined)
      ) {
        const changes = await getCommitContent(commit.id);
        convertedCommits.push(
          await convertBitBucketServerToOctane(commit, changes)
        );
      }
    }
    try {
      if (convertedCommits.length > 0) {
        const nrCommits = await putOctaneCommits(
          await buildCommitOctaneJson(convertedCommits, branch)
        );
        log.debug(`${nrCommits} commits have been sent to ALM Octane`);
      }
    } catch (error) {
      log.debug('Something went wrong !' + error.message);
    }
  }
};
const injectCommits = async () => {
  if (await getOctaneBuild()) await groupCommitsByBranch();
  else
    log.error(
      `Build with id: ${configs.octaneBuildId} is not in given workspace : ${configs.octaneWorkspace}`
    );
};

await injectCommits();
