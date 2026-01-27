import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import s3Client from "../config/s3Config.js";

export const uploadToS3 = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: "public-read", 
    contentType: multerS3.AUTO_CONTENT_TYPE, 
    key: function (req, file, cb) {
  const folder = file.mimetype.includes("video") ? "videos" : 
                 file.mimetype.includes("pdf") ? "documents" : "images";
  const fileName = `${Date.now()}_${file.originalname}`;
  cb(null, `${folder}/${fileName}`);
},
  }),
});