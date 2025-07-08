import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DATABASE_URI: string;
  NODE_ENV: "development" | "production";
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables: string[] = ["PORT", "DATABASE_URI", "NODE_ENV"];

  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DATABASE_URI: process.env.DATABASE_URI as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
  };
};

export const envVars = loadEnvVariables()
