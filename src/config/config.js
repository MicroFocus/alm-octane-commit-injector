import { config } from 'dotenv';

config();

const configs = {
  octaneUrl: process.env.OCTANE_URL,
  octaneSharedSpace: process.env.OCTANE_SHAREDSPACE,
  octaneWorkspace: process.env.OCTANE_WORKSPACE,
  octaneUser: process.env.OCTANE_CLIENT_ID,
  octanePassword: process.env.OCTANE_CLIENT_SECRET,
  octaneCIServer: process.env.OCTANE_CI_SERVER_ID,
  octaneJobId: process.envOCTANE_JOB_ID,
  octaneBuildId: process.env.OCTANE_BUILD_ID,
  bitBucketUrl: process.env.BITBUCKET_URL,
  bitBucketAccessToken: process.env.BITBUCKET_ACCESSTOKEN,
  bitBucketProjectName: process.env.BITBUCKET_PROJECT_NAME,
  bitBucketRepoSlug: process.env.BITBUCKET_REPO_SLUG,
  bitBucketSince: process.env.SINCE,
  bitBucketUntil: process.env.UNTIL,
};
export default configs;
