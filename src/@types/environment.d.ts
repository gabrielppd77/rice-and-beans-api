export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'dev' | 'prod' | 'test';
      DB_USER: string;
      DB_PASSWORD: string;
      DB_HOST: string;
      DB_PORT: number;
      DB_NAME: string;
      DB_SCHEMA: string;

      DATABASE_URL: string;

      JWT_SECRET: string;
      JWT_EXPIRE: string;

      S3_REGION: string;
      S3_NAME_BUCKET: string;
      S3_ACCESS_KEY_ID: string;
      S3_SECRET_ACCESS_KEY: string;
    }
  }
}
