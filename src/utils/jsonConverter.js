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

import configs from '../config/config.js';
import log from '../config/loggerConfig.js';

export const buildCommitOctaneJson = async (commits, branch) => {
  log.debug('Mapping commits...');
  const repositoryJson = {
    type: 'git',
    url:
      configs.bitBucketUrl +
      '/scm/' +
      configs.bitBucketProjectKey +
      '/' +
      configs.bitBucketRepoSlug +
      '.git',
    branch: branch,
  };
  return [
    {
      repository: repositoryJson,
      commits: commits,
    },
  ];
};

export const convertBitBucketServerToOctane = async (commit, changes) => {
  return {
    user: commit.committer.name,
    userEmail: commit.committer.emailAddress,
    time: commit.committerTimestamp.toString(),
    parentRevId: commit.parents[0] !== undefined ? commit.parents[0].id : null,
    comment: commit.message,
    revId: commit.id,
    changes: extractChangesForCommit(changes),
  };
};

const extractChangesForCommit = (changes) => {
  return changes.map((change) => {
    const isRename = change.properties.gitChangeType === 'RENAME';
    let typeOfCommit = 'edit';
    if (change.properties.gitChangeType === 'ADD') typeOfCommit = 'add';
    else if (change.properties.gitChangeType === 'DELETE')
      typeOfCommit = 'delete';
    return {
      type: typeOfCommit,
      file: isRename ? change.srcPath.toString : change.path.toString,
      renameToFile: isRename ? change.path.toString : null,
      commitId: null,
    };
  });
};
