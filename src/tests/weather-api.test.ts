import { AxiosError } from 'axios';
import { getWeather } from '../utils/api-client';
import { TestLogger } from '../utils/logger';
import { WeatherResponse } from '../types/weather-types';

describe('Weather API', () => {

  test('should fetch current weather for a valid city', async () => {
    try {
      const response = await getWeather('London');
      const data: WeatherResponse = response.data;

      expect(data).toHaveProperty('main');
      expect(data).toHaveProperty('weather');
      expect(data.name).toBe('London');

      TestLogger.info(`Successfully fetched weather for ${data.name}`);
    } catch (err) {
      const error = err as AxiosError;
      TestLogger.error('Failed to fetch weather for London', error);
      throw error; // rethrow so test fails
    }
  });

});
