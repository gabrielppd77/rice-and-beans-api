import '../src/utils/config-path-alias';

import NodeEnvironment from 'jest-environment-node';
import { execSync } from 'child_process';

import { randomUUID } from 'crypto';
import { config } from 'dotenv';
import { Client } from 'pg';

import { AppManager } from './AppManager';

config({ path: '.env' });

export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string;
  private connectionString: string;

  constructor(config: any, context: any) {
    super(config, context);

    const dbUser = process.env.DB_USER;
    const dbPass = process.env.DB_PASSWORD;
    const dbHost = process.env.DB_HOST;
    const dbPort = process.env.DB_PORT;
    const dbName = process.env.DB_NAME;

    this.schema = `test_${randomUUID()}`;
    this.connectionString = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${this.schema}`;
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;
    await execSync('npx prisma migrate deploy');

    await AppManager.startApp();

    return super.setup();
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    });
    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();

    await AppManager.stopApp();
  }
}
