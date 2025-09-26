export interface TestConfig {
  apiKey: string;
  baseUrl: string;
  timeout: number;
  enableDetailedLogging: boolean;
}

export const testConfig: TestConfig = {
  apiKey: process.env.OPENWEATHER_API_KEY || '',
  baseUrl: process.env.OPENWEATHER_BASE_URL || 'https://api.openweathermap.org/data/2.5',
  timeout: parseInt(process.env.TEST_TIMEOUT || '30000'),
  enableDetailedLogging: process.env.ENABLE_DETAILED_LOGGING === 'true'
};