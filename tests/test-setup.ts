import { config } from 'dotenv';
import { TestLogger } from '../src/utils/logger';

config(); // load .env

// Ensure API key is present
if (!process.env.OPENWEATHERMAP_API_KEY || process.env.OPENWEATHERMAP_API_KEY.trim() === '') {
  TestLogger.error(
    'OPENWEATHERMAP_API_KEY is missing. Skipping all API tests. Please set it in your .env file.'
  );

  // Tell Jest to skip all tests in this run
  beforeAll(() => {
    pending('Skipping tests: No OpenWeatherMap API key found in .env');
  });

  test.skip('API tests skipped due to missing API key', () => {
    expect(true).toBe(true);
  });
} else {
  TestLogger.info('OpenWeatherMap API key detected, tests will run.');
}
