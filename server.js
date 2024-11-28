import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import { errorHandler } from './backend/src/middlewares/errorHandler.js';
import { notFoundHandler } from './backend/src/middlewares/notFoundHandler.js';
import router from './backend/src/routes/index.js';
import swaggerDocs from './backend/src/middlewares/swaggerDocs.js';
import {
  PORT,
  NODE_ENV,
  UPLOAD_DIR,
  LOGGER_CONFIG,
  CORS_OPTIONS,
  SWAGGER_PATH,
} from './backend/src/constants/index.js';
import dotenv from 'dotenv';

dotenv.config();

console.log(`Running in ${NODE_ENV} mode`);

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors(CORS_OPTIONS));
  app.use(pino(LOGGER_CONFIG));
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use(router);

  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  });

  app.use('/api-docs', swaggerDocs(SWAGGER_PATH));
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
