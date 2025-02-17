import AWS from "aws-sdk";
import config from "./index";


AWS.config.update({
    accessKeyId: config.aws_access_key_id,
    secretAccessKey: config.aws_access_key,
    region:config.aws_region,
})

const s3 = new AWS.S3();
export default s3;