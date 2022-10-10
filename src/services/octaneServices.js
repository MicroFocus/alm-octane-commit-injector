import { Octane } from '@microfocus/alm-octane-js-rest-sdk';
import configs from '../config/config.js';
import log from '../config/loggerConfig.js';

const octane = new Octane({
  server: configs.octaneUrl,
  sharedSpace: configs.octaneSharedSpace,
  workSpace: configs.octaneWorkspace,
  user: configs.octaneUser,
  password: configs.octanePassword,
  headers: {
    'ALM-OCTANE-TECH-PREVIEW': true,
    'ALM-OCTANE-PRIVATE': true,
  },
});

const sendOctanePutRequest = async (path, entityList) => {
  const response = await octane.executeCustomRequest(
    '/api/shared_spaces/' + path,
    Octane.operationTypes.update,
    entityList,
    { 'content-type': 'application/json' }
  );

  const numberOfCommits = entityList.reduce(
    (total, entity) => total + entity.commits.length,
    0
  );
  return numberOfCommits;
};

export const putOctaneCommits = async (commits) => {
  log.debug('Injecting commits to ALM Octane...');
  return await sendOctanePutRequest(
    configs.octaneSharedSpace +
      '/scm-commits?instance-id=' +
      configs.octaneCIServer +
      '&job-ci-id=' +
      configs.octaneJobId +
      '&build-ci-id=' +
      configs.octaneBuildId,
    commits
  );
};
