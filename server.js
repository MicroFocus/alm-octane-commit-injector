import {config} from "dotenv";
import {buildCommitOctaneJson} from "./src/utils/JsonConverter.js";
import {groupCommitsByBranch} from "./src/utils/UtilFunctions.js";
import {getCommits} from "./src/services/BitBucketServices.js";


config();
async function main(){
   buildCommitOctaneJson(await groupCommitsByBranch(await getCommits()));
}
main();
