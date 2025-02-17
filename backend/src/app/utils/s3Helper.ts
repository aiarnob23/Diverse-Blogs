import config from "../config";
import s3 from "../config/aws";

export const uploadToS3 = async (file: Express.Multer.File, folder: string) => {
  const params = {
    Bucket: config.aws_bucket || "",
    Key: `${folder}/${Date.now()}_${file.originalname}`, 
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read", 
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location; 
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
};
