import { AxiosError } from 'axios';
import { getWeather } from '../utils/api-client';
import { TestLogger } from '../utils/logger';

describe('Integration API Tests', () => {

  test('integration test for weather API', async () => {
    try {
      const response = await getWeather('New York');
      expect(response.data).toHaveProperty('main');
      expect(response.data.name).toBe('New York');
      TestLogger.info('Integration test passed for New York');
    } catch (err) {
      const error = err as AxiosError;
      TestLogger.error('Integration test failed for New York', error);
      throw error;
    }
  });

});
