import {getCommitContent} from "../services/BitBucketServices.js";

export async function buildCommitOctaneJson(commits){
    const repository ={};
    repository.type="git";
    repository.url =process.env.BITBUCKET_URL+'/scm/'+process.env.BITBUCKET_PROJECT_NAME+"/"+process.env.BITBUCKET_REPO_SLUG+'.git'
    const keys=commits.keys();
    let key=keys.next();
    const octaneCommitJson=[];
    while(!key.done)
    {
        repository.branch=key.value;
        const octaneElementJson={};
        octaneElementJson.repository=repository;
        octaneElementJson.commits=commits.get(key.value);
        octaneCommitJson.push(octaneElementJson)
        key=keys.next();
    }
    return octaneCommitJson
}

export async function convertBitBucketServerToOctane(commit){
    const changes=await getCommitContent(commit.id);
    const commitJson={};
    commitJson.user=commit.committer.name;
    commitJson.userEmail=commit.committer.emailAddress;
    commitJson.time=commit.committerTimestamp;
    commitJson.parentrRevId=commit.parents[0].id;
    commitJson.comment=commit.message;
    commitJson.revId=commit.id;
    commitJson.changes=extractChangesForCommit(changes,commit.id);
    return commitJson;
}

function extractChangesForCommit(changes,commitId){
    let changesToReturn=[];
    changes.forEach(change=>{
        const changeJson={};
        changeJson.type=change.properties.gitChangeType;
        changeJson.file=change.path.toString;
        changeJson.renameToFile=null;
        changeJson.commitId=null;
        changesToReturn.push(changeJson);
    })
    return changesToReturn;
}