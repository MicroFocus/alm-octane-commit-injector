import {getCommits} from "./src/services/BitBucketServices.js";
import {config} from "dotenv";

config();

const data = await getCommits();
data.values.forEach(x=>console.log(x.id));