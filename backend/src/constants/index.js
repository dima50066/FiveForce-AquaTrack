import path from "node:path";

export const SWAGGER_PATH = path.resolve("docs", "swagger.json");

export const TEMPLATES_DIR = path.join(process.cwd(),   'backend',
'src',
'templates',);