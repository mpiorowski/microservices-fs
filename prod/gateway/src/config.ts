export const env = (envVar: string) => {
  if (!process.env[envVar]) {
    throw Error(`Environment not set: ${envVar} `);
  } else {
    return process.env[envVar] as string;
  }
};

export const Config = {
  PORT: env('PORT'),
  NODE_ENV: env('NODE_ENV'),
  USERS_URI: env('USERS_URI'),
  COOKIE_DOMAIN: env('COOKIE_DOMAIN'),
  USER_SESSION_EXPIRE_IN_HOURS: env('USER_SESSION_EXPIRE_IN_HOURS'),
};
