import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import pino from 'pino-http';
import { errorHandler } from './src/middlewares/errorHandler.js';
import { notFoundHandler } from './src/middlewares/notFoundHandler.js';
import router from './src/routes/index.js';
import corsOptions from './src/utils/corsConfig.js';
import { fileURLToPath } from 'url';
import path from 'path';
import swaggerDocs from './src/middlewares/swaggerDocs.js';

dotenv.config();

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = path.join(__dirname, 'uploads');

const PORT = process.env.PORT || 3000;
console.log(`Running in ${process.env.NODE_ENV || 'development'} mode`);

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(cookieParser());

  app.use(cors(corsOptions));

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use(router);

  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  });

  app.use('/api-docs', swaggerDocs());

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
