declare namespace NodeJS {
  interface ProcessEnv {
    SERVER_PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DATABASE_URL: string;
  }
}
