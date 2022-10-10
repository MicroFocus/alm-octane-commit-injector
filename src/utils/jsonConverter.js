import configs from '../config/config.js';
import log from '../config/loggerConfig.js';

export const buildCommitOctaneJson = async (commits) => {
  log.debug('Mapping commits...');
  const repositoryJson = {
    type: 'git',
    url:
      configs.bitBucketUrl +
      '/scm/' +
      configs.bitBucketProjectName +
      '/' +
      configs.bitBucketRepoSlug +
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
};

export const convertBitBucketServerToOctane = async (commit, changes) => {
  return {
    user: commit.committer.name,
    userEmail: commit.committer.emailAddress,
    time: commit.committerTimestamp.toString(),
    parentRevId: commit.parents[0].id,
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
