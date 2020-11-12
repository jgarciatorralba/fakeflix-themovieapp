// Import dependencies
import dotenv from "dotenv";

dotenv.config();

export const config = () => {
  const MODE = process.env.NODE_ENV || "production";

  const config = {
    test: {
      app: {
        MODE: "test",
        PORT: Number(process.env.PORT),
        SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
        API_KEY: process.env.API_KEY,
        API_TOKEN: process.env.API_TOKEN,
        SECRET: process.env.SECRET,
        SERVER_DOMAIN: process.env.SERVER_DOMAIN,
        CLIENT_DOMAIN: process.env.CLIENT_DOMAIN,
      },
      db: {
        CLUSTER: process.env.DB_CLUSTER,
        USER: process.env.DB_USER,
        PWD: process.env.DB_PWD,
        NAME: process.env.DB_NAME,
      },
    },
    production: {
      app: {
        MODE: "production",
        PORT: Number(process.env.PORT),
        SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
        API_KEY: process.env.API_KEY,
        API_TOKEN: process.env.API_TOKEN,
        SECRET: process.env.SECRET,
        SERVER_DOMAIN: process.env.SERVER_DOMAIN,
        CLIENT_DOMAIN: process.env.CLIENT_DOMAIN,
      },
      db: {
        CLUSTER: process.env.DB_CLUSTER,
        USER: process.env.DB_USER,
        PWD: process.env.DB_PWD,
        NAME: process.env.DB_NAME,
      },
    },
    development: {
      app: {
        MODE: "development",
        PORT: Number(process.env.PORT),
        SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
        API_KEY: process.env.API_KEY,
        API_TOKEN: process.env.API_TOKEN,
        SECRET: process.env.SECRET,
        SERVER_DOMAIN: process.env.SERVER_DOMAIN,
        CLIENT_DOMAIN: process.env.CLIENT_DOMAIN,
      },
      db: {
        CLUSTER: process.env.DB_CLUSTER,
        USER: process.env.DB_USER,
        PWD: process.env.DB_PWD,
        NAME: process.env.DB_NAME,
      },
    },
  };

  return config[MODE];
};
