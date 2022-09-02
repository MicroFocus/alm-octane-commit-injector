import {getCommits} from "./src/services/BitBucketServerServices.js";

const data = await getCommits();
data.values.forEach(x=>console.log(x.id));