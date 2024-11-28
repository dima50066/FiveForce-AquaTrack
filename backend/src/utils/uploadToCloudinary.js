import cloudinary from 'cloudinary';
import { env } from './env.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: env('CLOUD_NAME'),
  api_key: env('API_KEY'),
  api_secret: env('API_SECRET'),
});

export const uploadToCloudinary = (filePath) =>
  cloudinary.v2.uploader.upload(filePath);
