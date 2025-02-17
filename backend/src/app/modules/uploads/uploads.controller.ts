import { Request, Response } from "express";
const express = require("express");

const cloudinary = require("../../utils/cloudinary");


const handleUploadImage = async (req: Request, res: Response) => {
    console.log('req aise image upload er');
    console.log(req?.file);
  cloudinary.uploader.upload(req?.file?.path, function (err:any, result:any) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error",
      });
    }

    console.log('result', result);

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: result,
    });
  });
}


export const uploadControllers = {
    handleUploadImage,
}

