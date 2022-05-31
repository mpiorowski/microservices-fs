import { env } from "../@utils/env.util";

export const Config = {
  PORT: env("PORT"),
  NODE_ENV: env("NODE_ENV"),
  POSTGRES: env("POSTGRES"),
};
