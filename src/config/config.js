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

import { config } from 'dotenv';
import log from "./loggerConfig.js";

config();

const configs = {
  octaneUrl: process.env.OCTANE_URL,
  octaneSharedSpace: process.env.OCTANE_SHAREDSPACE,
  octaneWorkspace: process.env.OCTANE_WORKSPACE,
  octaneUser: process.env.OCTANE_CLIENT_ID,
  octanePassword: process.env.OCTANE_CLIENT_SECRET,
  octaneCIServer: process.env.OCTANE_CI_SERVER_ID,
  octaneJobId: process.env.OCTANE_JOB_ID,
  octaneBuildId: process.env.OCTANE_BUILD_ID,
  bitBucketUrl: process.env.BITBUCKET_URL,
  bitBucketAccessToken: process.env.BITBUCKET_ACCESSTOKEN,
  bitBucketProjectKey: process.env.BITBUCKET_PROJECT_KEY,
  bitBucketRepoSlug: process.env.BITBUCKET_REPO_SLUG,
  bitBucketBranches: process.env.BITBUCKET_BRANCHES,
  bitBucketSince: process.env.SINCE,
  bitBucketUntil: process.env.UNTIL,
};

const validateConfigs = () => {
  if(configs.octaneUrl === '')
    throw new Error('Octane URL is empty');
  if(configs.octaneSharedSpace === '')
    throw new Error('Octane Shared Space is empty');
  if(configs.octaneWorkspace === '')
    throw new Error('Octane Workspace is empty');
  if(configs.octaneUser === '')
    throw new Error('Octane User is empty');
  if(configs.octanePassword === '')
    throw new Error('Octane Password is empty');
  if(configs.octaneCIServer === '')
    throw new Error('Octane CI Server Instance is empty');
  if(configs.octaneJobId === '')
    throw new Error('Octane Job ID is empty');
  if(configs.octaneBuildId === '')
    throw new Error('Octane Build ID is empty');
  if(configs.bitBucketUrl === '')
    throw new Error('BitBucket Server URL is empty');
  if(configs.bitBucketAccessToken === '')
    throw new Error('BitBucket Server Access Token is empty');
  if(configs.bitBucketProjectKey === '')
    throw new Error('BitBucket Server Project Key is empty');
  if(configs.bitBucketRepoSlug=== '')
    throw new Error('BitBucket Server Repository Name is empty');
}

validateConfigs();

export default configs;
