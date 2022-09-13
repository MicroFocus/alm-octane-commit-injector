import fetch from 'node-fetch';
import log from "../config/loggerConfig.js";

async function sendBitBucketGetRequest(path, pathApiOrBranchUtils) {
  if (!path.startsWith('/')) path = '/' + path;
  try {
    const response = await fetch(
      process.env.BITBUCKET_URL +
        '/rest/' +
        pathApiOrBranchUtils +
        '/1.0/projects/' +
        process.env.BITBUCKET_PROJECT_NAME +
        '/repos/' +
        process.env.BITBUCKET_REPO_SLUG +
        path,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + process.env.BITBUCKET_ACCESSTOKEN,
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
}

export function getCommits() {
  log.debug('Fetching commits...')
  return sendBitBucketGetRequest(
    '/commits/?since=' + process.env.SINCE + '&until=' + process.env.UNTIL,
    'api'
  );
}

export function getCommitContent(commitId) {
  return sendBitBucketGetRequest('/commits/' + commitId + '/changes', 'api');
}

export function getCommitBranch(commitId) {
  return sendBitBucketGetRequest('/branches/info/' + commitId, 'branch-utils');
}
