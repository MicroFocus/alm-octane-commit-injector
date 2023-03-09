# alm-octane-commit-injector

## Introduction

A tool that can be used to inject commits from BitBucket Server in ALM Octane.

## How to install

### Install locally

#### By cloning the project

- Download the project locally
- Navigate inside the project
- run `npm i -g`
- You can now run `npx alm-octane-commit-injector` command from anywhere using a terminal

#### By directly installing the command globally

- run `npm i -g @microfocus/alm-octane-commit-injector`
- You can now run `npx alm-octane-commit-injector` command from anywhere using a terminal

### Run directly from the npm registry

- Directly run `npx @microfocus/alm-octane-commit-injector` command so that npm automatically downloads and runs the tool

### Note: .env configuration file should be in the same directory where the `npx` command is run.


## Configuration

This tool uses multiple parameters from the configuration file ('.env') to fetch commits between two specific boundaries, map them to the ALM Octane format and inject them to a specific CI.

e.g.:

![image](https://media.github.houston.softwaregrp.net/user/15955/files/9da6a39f-fe2d-4c7b-b7e3-d81213f93352)


### BitBucketServer parameters

BITBUCKET_URL - base URL for BitBucket server (egg. https://bitbucket.mycompany.com)

BITBUCKET_ACCESSTOKEN - a generated HTTP access token from BitBucket

BITBUCKET_PROJECT_KEY - key of the project (usually 3 characters abbreviation of the project name can be found in BitBucket → Projects)

BITBUCKET_REPO_SLUG - repository name

BITBUCKET_BRANCHES - a list of the branch names separated with ';' (if this is empty, it will automatically fetch the commits from all branches)

SINCE - the commit ID after which commits should be fetched (if this is empty, it will fetch the commits from the beginning)

UNTIL - the commit ID before which commits should be fetched (if this is empty, it will fetch the commits until the last one)

### ALM Octane parameters
OCTANE_URL - ALM Octane base URL

OCTANE_CLIENT_ID - client ID for an active API Access (A new one can be created in Octane → Spaces → API Access)

OCTANE_CLIENT_SECRET - client secret for an active API Access

OCTANE_SHAREDSPACE - sharedSpace ID

OCTANE_WORKSPACE - workspace ID

OCTANE_CI_SERVER_ID - instance_id of the CI Server (can be found in Settings -> Spaces -> {workspace_name} -> DevOps -> CI Servers -> Instance ID)

![image](https://media.github.houston.softwaregrp.net/user/15955/files/aef8037d-b96a-4932-ad20-b725440b9e41)


OCTANE_JOB_ID - ci_id of the CI Job representing the name of the job (can be found under Pipilines -> Overview)

![image](https://media.github.houston.softwaregrp.net/user/15955/files/9ee13df0-4915-4c01-9126-d031632228ec)


OCTANE_BUILD_ID - build_ci_id of the CI Build (can be found under Pipilines -> Overview -> {Job} -> Builds (Grid View))

![image](https://media.github.houston.softwaregrp.net/user/15955/files/c5665401-c6b7-4fec-b88e-436bb607d391)




