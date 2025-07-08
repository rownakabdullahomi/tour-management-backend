import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

let server: Server;

const startServer = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URI!);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    server = app.listen(5000, () => {
      console.log(`⚡ Server is running on port: 5000.`);
    });
  } catch (error) {
    console.log(`❌ Error: ${error}`);
    process.exit(1);
  }
};

startServer();
