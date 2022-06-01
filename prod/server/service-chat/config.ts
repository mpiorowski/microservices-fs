export const env = (envVar: string) => {
  if (!process.env[envVar]) {
    throw Error(`Environment not set: ${envVar} `);
  } else {
    return process.env[envVar] as string;
  }
};

export const Config = {
  PORT: env("PORT"),
  NODE_ENV: env("NODE_ENV"),
  POSTGRES: env("POSTGRES"),
};
