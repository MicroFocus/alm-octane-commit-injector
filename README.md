# alm-octane-commit-injector

## Introduction

A tool that can be used to inject commits to ALM Octane, using ALM Octane JavaScript Rest SDK. For more information also check ALM Octane JavaScript Rest SDK documentation and  REST API documentation for more details about Octane's API.

Easiest way to run is using the command:

`npm start`

from the root directory.

## Configuration

This tool uses multiple parameters from the configuration file ('.env') to fetch commits between two specific boundaries, map them to the ALM Octane format and inject them to a specific CI.

### BitBucketServer parameters

BITBUCKET_URL - base url for bitbucket server (egg. https://bitbucket.mycompany.com)

BITBUCKET_ACCESSTOKEN - a generated http access token from BitBucket

BITBUCKET_PROJECT_NAME - key of the project (usually a 3 characters abrevetion of the project name can be found in BitBucket-> Projects)

BITBUCKET_REPO_SLUG - repository name

SINCE - the commit ID after which commits should be fetched

UNTIL - the commit ID before which commits should be fetched

### ALM Octane parameters
OCTANE_URL - ALM Octane base URL

OCTANE_CLIENT_ID - client id for an active API Access (A new one can be create in Octane->Spaces->API Access)

OCTANE_CLIENT_SECRET - client secret for an active API Access

OCTANE_SHAREDSPACE - sharedspace id

OCTANE_WORKSPACE - workspace id

OCTANE_CI_SERVER_ID - instance_id of the CI Server

OCTANE_JOB_ID - ci_id of the CI Job representing the name of the job

OCTANE_BUILD_ID - build_ci_id of the CI Build



