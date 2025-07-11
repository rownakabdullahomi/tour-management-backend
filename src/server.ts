/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
  try {
    const conn = await mongoose.connect(envVars.DATABASE_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    server = app.listen(envVars.PORT, () => {
      console.log(`⚡ Server is running on port: ${envVars.PORT}.`);
    });
  } catch (error) {
    console.log(`❌ Error: ${error}`);
    process.exit(1);
  }
};

(async () => {
  await startServer();
  await seedSuperAdmin();
})();

process.on("unhandledRejection", (error) => {
  console.log(
    "Unhandled Rejection detected... Server is shutting down...",
    error
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log(
    "Uncaught Exception detected... Server is shutting down...",
    error
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received... Server is shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("📶 SIGINT signal received... Server is shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

/// Unhandled Rejection Error
//> Promise.reject(new Error("I forgot to catch"));

/// Uncaught Exception Error
//> throw new Error("I forgot to catch")
