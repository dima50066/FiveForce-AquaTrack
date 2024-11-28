import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniquePrefix}_${file.originalname}`);
  },
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
});

export const upload = multer({ storage });
