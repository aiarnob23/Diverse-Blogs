import config from "../config";

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.cloud_api_key,
  api_secret: config.cloud_api_secret,
});

module.exports = cloudinary;
