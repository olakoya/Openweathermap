import dotenv from 'dotenv';
dotenv.config();

export const API_KEY = process.env.OPENWEATHER_API_KEY;
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';


module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/*.test.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json'],
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
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