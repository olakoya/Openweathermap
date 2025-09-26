import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',                     // Use ts-jest to compile TypeScript
  testEnvironment: 'node',               // Run tests in Node.js
  roots: ['<rootDir>/src', '<rootDir>/tests'], // Look for tests in both src/ and tests/
  testMatch: [
    '**/__tests__/**/*.ts', 
    '**/?(*.)+(spec|test).ts'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',              // Compile TypeScript files
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/*.test.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json'],
  setupFilesAfterEnv: ['<rootDir>/tests/test-setup.ts'], // Global setup
  reporters: [
    'default',
    ['jest-html-reporters', {
      publicPath: './test-results',
      filename: 'test-report.html',
      expand: true,
      hideIcon: false,
      pageTitle: 'OpenWeatherMap API Test Results'
    }],
    ['jest-junit', {
      outputDirectory: './test-results',
      outputName: 'junit.xml'
    }]
  ],
  testTimeout: 30000
};

export default config;
