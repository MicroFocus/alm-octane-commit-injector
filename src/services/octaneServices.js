import { Octane } from '@microfocus/alm-octane-js-rest-sdk';
import configs from '../config/config.js';
import log from '../config/loggerConfig.js';

const octane = new Octane({
  server: configs.octaneUrl,
  sharedSpace: configs.octaneSharedSpace,
  workspace: configs.octaneWorkspace,
  user: configs.octaneUser,
  password: configs.octanePassword,
  headers: {
    ALM_OCTANE_TECH_PREVIEW: true,
    ALM_OCTANE_PRIVATE: true,
  },
});
const sendOctanePutRequest = async (path, entityList) => {
  await octane.executeCustomRequest(
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
