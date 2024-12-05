import path from 'path';

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};

export const TEMPLATES_DIR = path.join(
  process.cwd(),
  'backend',
  'src',
  'templates',
);
export const TEMP_UPLOAD_DIR = path.join(
  process.cwd(),
  'backend',
  'src',
  'temp',
);
export const UPLOAD_DIR = path.join(process.cwd(), 'backend', 'src', 'uploads');

export const SWAGGER_PATH = path.join(
  process.cwd(),
  'backend',
  'docs',
  'swagger.json',
);

export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || 'development';

export const LOGGER_CONFIG =
  NODE_ENV === 'production'
    ? {
        level: 'info',
      }
    : {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
      };

export const CORS_OPTIONS = {
  origin: 'https://five-force-fronted.vercel.app',
  credentials: true,
};
