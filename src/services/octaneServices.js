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
    'ALM-OCTANE-TECH-PREVIEW': true,
    'ALM-OCTANE-PRIVATE': true,
  },
});

const sendOctanePutRequest = async (path, entityList) => {
  log.debug(
    (
      await octane.executeCustomRequest(
        '/api/shared_spaces/' + path,
        Octane.operationTypes.update,
        entityList,
        { 'content-type': 'application/json' }
      )
    ).status
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
