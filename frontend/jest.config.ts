/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  coverageDirectory: 'public/jest-reports/',
  collectCoverage: true,
  collectCoverageFrom: ['src/app/**/*.ts', '!src/app/layout.tsx'],
  coverageReporters: ['html-spa'],
  coverageProvider: 'v8',
  testPathIgnorePatterns: ['/node_modules/', '/cypress/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};

export default createJestConfig(config);
