import fetch from "node-fetch";


export async function getCommits() {
    try {
        const response = await fetch(process.env.BITBUCKET_URL +
            '/rest/api/1.0/projects/' + process.env.BITBUCKET_PROJECT_NAME +
            '/repos/' + process.env.BITBUCKET_REPO_SLUG + '/commits/?since='
            + process.env.SINCE + '&until=' + process.env.UNTIL, {

            method: 'GET',
            headers: {
                Authorization: "Bearer " + process.env.BITBUCKET_ACCESSTOKEN,
                'Accept': 'application/json'
            }
        })
        if (response.status === 200) {
            return await response.json();
        } else {
            console.log(
                `Response: ${response.status} ${response.statusText}`
            );
        }
    }
    catch (error){
        console.log(error);
    }
}
export async function getCommitContent(commitId) {
    try {
        const response = await fetch(process.env.BITBUCKET_URL +
            '/rest/api/1.0/projects/' + process.env.BITBUCKET_PROJECT_NAME +
            '/repos/' + process.env.BITBUCKET_REPO_SLUG + '/commits/'+commitId+'/changes', {

            method: 'GET',
            headers: {
                Authorization: "Bearer " + process.env.BITBUCKET_ACCESSTOKEN,
                'Accept': 'application/json'
            }
        })
        if (response.status === 200) {
            return await response.json();
        } else {
            console.log(
                `Response: ${response.status} ${response.statusText}`
            );
        }
    }
    catch (error){
        console.log(error);
    }
}

export async function getCommitBranch(commitId){
    try {
        const response = await fetch(process.env.BITBUCKET_URL +
            '/rest/branch-utils/1.0/projects/' + process.env.BITBUCKET_PROJECT_NAME +
            '/repos/' + process.env.BITBUCKET_REPO_SLUG + '/branches/info/'+
            commitId, {

            method: 'GET',
            headers: {
                Authorization: "Bearer " + process.env.BITBUCKET_ACCESSTOKEN,
                'Accept': 'application/json'
            }
        })
        if (response.status === 200) {
            return await response.json();
        } else {
            console.log(
                `Response: ${response.status} ${response.statusText}`
            );
        }
    }
    catch (error){
        console.log(error);
    }

}