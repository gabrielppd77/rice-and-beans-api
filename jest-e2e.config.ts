import { Config } from 'jest';
import baseConfig from './jest.config';

const config: Config = {
  ...baseConfig,
  testEnvironment: './prisma/prisma-test-environment.ts',
  testRegex: '.e2e-spec.ts$',
};

export default config;
