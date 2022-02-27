const AWS = require('aws-sdk');
let iam;
const main = () => {
    if(!iam) {
        const credentials = new AWS.SharedIniFileCredentials({profile: process.env.UPDATE_PROFILE});
        AWS.config.credentials = credentials;
        AWS.config.credentials.accessKeyId=process.env.ACCESS_KEY_ID;
        AWS.config.credentials.secretAccessKey=process.env.SECRET_ACCESS_KEY;
        AWS.config.region=process.env.BUCKET_REGION;
        const ep = new AWS.Endpoint(process.env.UPLOAD_ENDPOINT);
        iam = new AWS.S3({endpoint: ep});
    }

    return iam;
}

module.exports = main();