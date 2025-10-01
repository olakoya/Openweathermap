import { AxiosError } from 'axios';
import { getWeather } from '../utils/api-client';
import { TestLogger } from '../utils/logger';

describe('Forecast API Tests', () => {

  test('should fetch forecast data for a city', async () => {
    try {
      const response = await getWeather('Sydney'); // Replace with forecast API if different
      expect(response.data).toHaveProperty('main');
      expect(response.data.name).toBe('Sydney');
      TestLogger.info('Forecast test passed for Sydney');
    } catch (err) {
      const error = err as AxiosError;
      TestLogger.error('Forecast test failed for Sydney', error);
      throw error;
    }
  });

});
