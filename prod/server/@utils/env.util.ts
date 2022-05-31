export const env = (envVar: string) => {
  if (!process.env[envVar]) {
    throw Error(`Environment not set: ${envVar} `);
  } else {
    return process.env[envVar] as string;
  }
};
