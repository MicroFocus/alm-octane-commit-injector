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

![git0](https://user-images.githubusercontent.com/62649591/211793525-fd8072c5-2df2-4867-ae6d-9b58c1a770bf.png)


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

![git1](https://user-images.githubusercontent.com/62649591/211793673-6cd3cd17-2f5a-4c5d-8981-90c82d23eba6.png)


OCTANE_JOB_ID - ci_id of the CI Job representing the name of the job (can be found under Pipilines -> Overview)

![git2](https://user-images.githubusercontent.com/62649591/211793708-5db13300-0e63-46e5-af68-fe3d313d0f76.png)


OCTANE_BUILD_ID - build_ci_id of the CI Build (can be found under Pipilines -> Overview -> {Job} -> Builds (Grid View))

![git3](https://user-images.githubusercontent.com/62649591/211793727-7dfb9c4e-8ead-4dcd-9c94-b275215650ce.png)
