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

import fetch from 'node-fetch';
import log from '../config/loggerConfig.js';
import configs from '../config/config.js';

const sendBitBucketGetRequest = async (path, pathApiOrBranchUtils) => {
  if (!path.startsWith('/')) path = '/' + path;
  try {
    const response = await fetch(
      configs.bitBucketUrl +
        '/rest/' +
        pathApiOrBranchUtils +
        '/1.0/projects/' +
        configs.bitBucketProjectKey +
        '/repos/' +
        configs.bitBucketRepoSlug +
        path,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + configs.bitBucketAccessToken,
          Accept: 'application/json',
        },
      }
    );
    if (response.status === 200) {
      return await response.json();
    } else {
      log.warn(`Response: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    log.error(error.message);
  }
};

export const getCommits = async (branch) => {
  console.log(
    '______________________________________________________________________________________'
  );
  log.debug('Fetching commits from branch: ' + branch);

  let start = 0;
  let jsonResponse = await sendBitBucketGetRequest(
    '/commits/?limit=200&start=' +
      +start +
      '&until=' +
      encodeURIComponent(branch),
    'api'
  );
  let commits = jsonResponse.values;

  while (jsonResponse.isLastPage === false) {
    start = jsonResponse.nextPageStart;
    jsonResponse = await sendBitBucketGetRequest(
      '/commits/?limit=200&start=' +
        +start +
        '&until=' +
        encodeURIComponent(branch),
      'api'
    );
    commits = commits.concat(jsonResponse.values);
  }

  return commits;
};

export const getCommitContent = async (commitId) => {
  let start = 0;
  let jsonResponse = await sendBitBucketGetRequest(
    '/commits/' + commitId + '/changes?limit=200&start' + start,
    'api'
  );
  let changes = jsonResponse.values;

  while (jsonResponse.isLastPage === false) {
    start = jsonResponse.nextPageStart;
    jsonResponse = await sendBitBucketGetRequest(
      '/commits/' + commitId + '/changes?limit=200&start' + start,
      'api'
    );
    changes = changes.concat(jsonResponse.values);
  }

  return changes;
};

export const getBranches = async () => {
  let start = 0;
  let jsonResponse = await sendBitBucketGetRequest(
    '/branches/' + '?limit=200&start=' + start,
    'api'
  );
  let branches = jsonResponse.values;

  while (jsonResponse.isLastPage === false) {
    start = jsonResponse.nextPageStart;
    jsonResponse = await sendBitBucketGetRequest(
      '/branches/' + '?limit=200&start=' + start,
      'api'
    );
    branches = branches.concat(jsonResponse.values);
  }

  return branches;
};

export const getCommitById = async (id) => {
  const commit = await sendBitBucketGetRequest('/commits/' + id, 'api');
  return commit;
};
