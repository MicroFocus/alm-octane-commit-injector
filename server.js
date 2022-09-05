import {config} from "dotenv";
import {convertBitBucketServerToOctane} from "./src/utils/JsonConverter.js";
import {getCommitBranch, getCommits} from "./src/services/BitBucketServices.js";
import Multimap from "multimap";

config();

async function buildCommits(){
    const commits = await getCommits();
    let initialOctaneCommit='[{ repository: {\n'+
        '"type": "git"'+",\n"+
        '"url": '+'"'+process.env.BITBUCKET_URL+'/scm/'+process.env.BITBUCKET_PROJECT_NAME+"/"+process.env.BITBUCKET_REPO_SLUG+'.git"'+",\n"+
        '"branch":';
    const groupedCommits=await groupCommitsByBranch(commits);
    const keys=groupedCommits.keys();
    let key=keys.next();
    while(!key.done)
    {
        let octaneCommit=initialOctaneCommit+key.value+'\n},\n'+
            '"commits":[\n';
        groupedCommits.get(key.value).forEach(commit=>octaneCommit+=commit+',');
        octaneCommit=octaneCommit.slice(0, -1);
        octaneCommit+='\n]\n}]'
        console.log(octaneCommit);
        key=keys.next();
    }
}

async function groupCommitsByBranch(commits){
    let map= new Multimap();
    for(let i=0;i<commits.values.length;i++){
        let branch = await getCommitBranch(commits.values[i].id);
        map.set(branch.values[0].displayId,await convertBitBucketServerToOctane(commits.values[i]));
    }
    return map;
}

buildCommits();