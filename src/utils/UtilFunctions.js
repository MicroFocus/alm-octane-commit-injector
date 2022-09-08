import Multimap from "multimap";
import {getCommitBranch} from "../services/BitBucketServices.js";
import {convertBitBucketServerToOctane} from "./JsonConverter.js";

export async function groupCommitsByBranch(commits){
    let map= new Multimap();
    for (const commit of commits) {
        map.set((await getCommitBranch(commit.id))[0].displayId,await convertBitBucketServerToOctane(commit));
    }
    return map;
}