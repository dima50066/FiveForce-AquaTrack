import { setupServer } from "./server.js";
import { initMongoConnection } from "./src/db/initMongoConnection.js";

const bootstrap = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error("Error during initialization:", error);
    process.exit(1);
  }
};

bootstrap();
