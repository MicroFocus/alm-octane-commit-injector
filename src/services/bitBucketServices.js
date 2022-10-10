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
        configs.bitBucketProjectName +
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
      return (await response.json()).values;
    } else {
      console.log(`Response: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCommits = () => {
  log.debug('Fetching commits...');
  return sendBitBucketGetRequest(
    '/commits/?since=' +
      configs.bitBucketSince +
      '&until=' +
      configs.bitBucketUntil,
    'api'
  );
};

export const getCommitContent = (commitId) => {
  return sendBitBucketGetRequest('/commits/' + commitId + '/changes', 'api');
};

export const getCommitBranch = (commitId) => {
  return sendBitBucketGetRequest('/branches/info/' + commitId, 'branch-utils');
};
