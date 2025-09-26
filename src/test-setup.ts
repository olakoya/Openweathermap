import dotenv from 'dotenv';
import { TestLogger } from './utils/logger';

// Load environment variables from .env file
dotenv.config();

// Global Jest setup hooks
beforeAll(() => {
  TestLogger.info('🚀 Starting OpenWeatherMap API Test Suite');

  // Validate required environment variables
  if (!process.env.OPENWEATHER_API_KEY) {
    throw new Error(
      '❌ Missing required environment variable: OPENWEATHER_API_KEY'
    );
  }
});

afterAll(() => {
  TestLogger.info('✅ OpenWeatherMap API Test Suite Completed');
});
