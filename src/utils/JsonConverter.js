import {getCommitContent} from "../services/BitBucketServices.js";

export async function convertBitBucketServerToOctane(commit){
    const changes=await getCommitContent(commit.id);
    const octaneChanges=extractChangesForCommit(changes.values,commit.id);
    const json='{\n'+
        '"user":"'+commit.committer.name+'",\n'+
        '"userEmail":"'+commit.committer.emailAddress+'",\n'+
        '"time":"'+commit.committerTimestamp+'",\n'+
        '"parentRevId":"'+commit.parents[0].id+'",\n'+
        '"comment":"'+commit.message+'",\n'+
        '"revId":"'+commit.id+'",\n'+
        '"changes":[\n'+ octaneChanges +'\n]\n}';
    return json;
}

function extractChangesForCommit(changes,commitId){
    const changesToReturn=[];

    for(let i=0;i < changes.length;i++){
        let change='{\n'+
            '"type": "'+changes[i].properties.gitChangeType +'",\n'+
            '"file": "' + changes[i].path.toString + '",\n' +
            '"renameToFile": "' + null + '",\n'+
            '"commitId":"' + null+ '"\n}';
        changesToReturn[i]=change;
    }
    return changesToReturn;
}