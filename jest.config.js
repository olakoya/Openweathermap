require('dotenv').config();

/** @type {import('jest').Config} */
module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  preset: 'ts-jest',                       // Use ts-jest for TypeScript
  testEnvironment: 'node',                 // Node environment for API tests
  roots: ['<rootDir>/src', '<rootDir>/tests'], // Source and test folders
  testMatch: ['**/*.test.ts', '**/*.spec.ts'], // Match test files
  transform: {
    '^.+\\.ts$': 'ts-jest',                // Transform TS files with ts-jest
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/*.test.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json'],
  setupFilesAfterEnv: ['<rootDir>/tests/test-setup.ts'],
  reporters: [
    'default',
    ['jest-html-reporters', {
      publicPath: './test-results',
      filename: 'test-report.html',
      expand: true,
      hideIcon: false,
      pageTitle: 'OpenWeatherMap API Test Results',
    }],
    ['jest-junit', {
      outputDirectory: './test-results',
      outputName: 'junit.xml',
    }]
  ],
  testTimeout: 30000,                      // 30s per test timeout
  maxWorkers: 1,                            // Run tests sequentially to avoid circular JSON errors
  verbose: true,                            // Show detailed test info in console
};
