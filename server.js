import {config} from "dotenv";
import fetch from "node-fetch";

config();

fetch(process.env.BITBUCKET_URL+
    '/rest/api/1.0/projects/'+process.env.BITBUCKET_PROJECT_NAME+
    '/repos/'+process.env.BITBUCKET_REPO_SLUG+'/commits/?since='
    +process.env.SINCE+'&until='+process.env.UNTIL, {

    method: 'GET',
    headers: {
        Authorization: "Bearer " + process.env.BITBUCKET_ACCESSTOKEN,
        'Accept': 'application/json'
    }
})
    .then(response => {
        console.log(
            `Response: ${response.status} ${response.statusText}`
        );
        return response.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));




