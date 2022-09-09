import { getCommitContent } from '../services/bitBucketServices.js';

export async function buildCommitOctaneJson(commits) {
  const repositoryJson = {
    type: 'git',
    url:
      process.env.BITBUCKET_URL +
      '/scm/' +
      process.env.BITBUCKET_PROJECT_NAME +
      '/' +
      process.env.BITBUCKET_REPO_SLUG +
      '.git',
    branch: 'master',
  };
  const keys = commits.keys();
  let key = keys.next();
  const octaneCommitJson = [];
  while (!key.done) {
    repositoryJson.branch = key.value;
    octaneCommitJson.push({
      repository: repositoryJson,
      commits: commits.get(key.value),
    });
    key = keys.next();
  }
  return octaneCommitJson;
}

export async function convertBitBucketServerToOctane(commit) {
  const changes = await getCommitContent(commit.id);
  return {
    user: commit.committer.name,
    userEmail: commit.committer.emailAddress,
    time: commit.committerTimestamp,
    parentRevId: commit.parents[0].id,
    comment: commit.message,
    revId: commit.id,
    changes: extractChangesForCommit(changes, commit.id),
  };
}

function extractChangesForCommit(changes, commitId) {
  let changesToReturn = [];
  changes.forEach((change) => {
    changesToReturn.push({
      type: change.properties.gitChangeType,
      file: change.path.toString,
      renameToFile: null,
      commitId: null,
    });
  });
  return changesToReturn;
}
