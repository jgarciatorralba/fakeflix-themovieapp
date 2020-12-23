// Import native node modules
import path from "path";

// Import dependencies
import dotenv from "dotenv";

dotenv.config({ path: path.resolve("..", ".env") });

export const config = () => {
  const MODE = process.env.NODE_ENV || "production";

  const config = {
    test: {
      app: {
        MODE: "test",
        PORT: Number(process.env.PORT),
        SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
        API_BASE_URL: process.env.API_BASE_URL,
        API_TOKEN: process.env.ACCESS_TOKEN_API,
        ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET,
        RESET_SECRET: process.env.RESET_TOKEN_SECRET,
        SERVER_DOMAIN: process.env.SERVER_DOMAIN,
        CLIENT_DOMAIN: process.env.CLIENT_DOMAIN,
      },
      db: {
        CLUSTER: process.env.DB_CLUSTER,
        USER: process.env.DB_USER,
        PWD: process.env.DB_PWD,
        TEST_NAME: process.env.DB_TEST_NAME,
      },
      smtp: {
        HOST: process.env.EMAIL_HOST,
        PORT: Number(process.env.EMAIL_PORT),
        USER: process.env.EMAIL_USER,
        PWD: process.env.EMAIL_PWD,
      },
    },
    production: {
      app: {
        MODE: "production",
        PORT: Number(process.env.PORT),
        SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
        API_BASE_URL: process.env.API_BASE_URL,
        API_TOKEN: process.env.ACCESS_TOKEN_API,
        ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET,
        RESET_SECRET: process.env.RESET_TOKEN_SECRET,
        SERVER_DOMAIN: process.env.SERVER_DOMAIN,
        CLIENT_DOMAIN: process.env.CLIENT_DOMAIN,
      },
      db: {
        CLUSTER: process.env.DB_CLUSTER,
        USER: process.env.DB_USER,
        PWD: process.env.DB_PWD,
        NAME: process.env.DB_NAME,
      },
      smtp: {
        SERVICE: process.env.EMAIL_PROD_SERVICE,
        USER: process.env.EMAIL_PROD_USER,
        PWD: process.env.EMAIL_PROD_PWD,
      },
    },
    development: {
      app: {
        MODE: "development",
        PORT: Number(process.env.PORT),
        SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
        API_BASE_URL: process.env.API_BASE_URL,
        API_TOKEN: process.env.ACCESS_TOKEN_API,
        ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET,
        RESET_SECRET: process.env.RESET_TOKEN_SECRET,
        SERVER_DOMAIN: process.env.SERVER_DOMAIN,
        CLIENT_DOMAIN: process.env.CLIENT_DOMAIN,
      },
      db: {
        CLUSTER: process.env.DB_CLUSTER,
        USER: process.env.DB_USER,
        PWD: process.env.DB_PWD,
        NAME: process.env.DB_NAME,
      },
      smtp: {
        HOST: process.env.EMAIL_HOST,
        PORT: Number(process.env.EMAIL_PORT),
        USER: process.env.EMAIL_USER,
        PWD: process.env.EMAIL_PWD,
      },
    },
  };

  return config[MODE];
};
