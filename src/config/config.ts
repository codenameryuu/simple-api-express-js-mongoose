import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

const config = {
  mongo: {
    url: process.env.MONGODB_URL ?? "",
  },
  server: {
    port: PORT,
  },
  authentication: {
    key: process.env.TOKEN_KEY ?? "",
  },
};

export default config;
