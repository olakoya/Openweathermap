import { AxiosError } from 'axios';
import { getWeather } from '../utils/api-client';
import { TestLogger } from '../utils/logger';

describe('Performance API Tests', () => {

  test('performance test for multiple cities', async () => {
    const cities = ['London', 'Tokyo', 'Paris'];
    try {
      for (const city of cities) {
        const response = await getWeather(city);
        expect(response.data).toHaveProperty('main');
        TestLogger.info(`Performance test passed for ${city}`);
      }
    } catch (err) {
      const error = err as AxiosError;
      TestLogger.error('Performance test failed', error);
      throw error;
    }
  });

});
