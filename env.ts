import "dotenv/config"; //Things we want to keep private such as connection string to mongodb.
import { cleanEnv, port, str } from "envalid";

export const env = cleanEnv(process.env, {
  DB_STRING: str(),
  DB_NAME: str({ default: "DevKitty" }),
  PORT: port({ default: 3000 }),
});
