import dotenv from 'dotenv';
import { TestLogger } from '../src/utils/logger';

// Load environment variables from .env file
dotenv.config();

// Global Jest setup hooks
beforeAll(() => {
  // Log the start of the entire test suite
  TestLogger.info('OpenWeatherMap API Test Suite Started');

  // Validate required environment variables
  if (!process.env.OPENWEATHER_API_KEY) {
    throw new Error(
      'Missing required environment variable: OPENWEATHER_API_KEY'
    );
  }
});

afterAll(() => {
  // Log the completion of the entire test suite
  TestLogger.info('OpenWeatherMap API Test Suite Completed');
});
