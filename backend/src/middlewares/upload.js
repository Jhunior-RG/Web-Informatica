import multer from 'multer'
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  keyFilename: "./crack-mix-439811-q5-7e550c2a133d.json"
});

const bucketName = "bucket-informatica";
export const bucket = storage.bucket(bucketName);

const upload = multer({
  storage: multer.memoryStorage(),
});

export default upload;
