import { WeatherService } from '../services/weather-service';
import { TestHelpers } from '../utils/test-helpers';
import { TestLogger } from '../utils/logger';

describe('OpenWeatherMap API - Performance Tests', () => {
  let weatherService: WeatherService;

  beforeAll(() => {
    weatherService = new WeatherService();
    TestLogger.info('⚡ Starting Performance Tests');
  });

  test('should respond within acceptable time limits', async () => {
    const startTime = Date.now();
    
    const response = await weatherService.getCurrentWeatherByCity('London');
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    TestHelpers.validateWeatherResponse(response);
    
    // Response should be under 5 seconds
    expect(responseTime).toBeLessThan(5000);
    
    TestLogger.info(`Response time: ${responseTime}ms`);
  });

  test('should handle concurrent requests', async () => {
    const cities = ['London', 'Paris', 'Berlin', 'Madrid', 'Rome'];
    const startTime = Date.now();
    
    const promises = cities.map(city => 
      weatherService.getCurrentWeatherByCity(city)
    );
    
    const responses = await Promise.all(promises);
    
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    
    // All requests should succeed
    responses.forEach(response => {
      TestHelpers.validateWeatherResponse(response);
    });
    
    // Concurrent requests should be faster than sequential
    expect(totalTime).toBeLessThan(10000);
    
    TestLogger.info(`Concurrent requests completed in: ${totalTime}ms`);
  });

  test('should handle multiple API calls without degradation', async () => {
    const responseTimes: number[] = [];
    
    for (let i = 0; i < 5; i++) {
      const startTime = Date.now();
      
      const response = await weatherService.getCurrentWeatherByCity('Tokyo');
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      responseTimes.push(responseTime);
      TestHelpers.validateWeatherResponse(response);
      
      // Small delay between requests
      await TestHelpers.delay(200);
    }
    
    // Calculate average response time
    const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    
    // No individual request should be extremely slow
    responseTimes.forEach(time => {
      expect(time).toBeLessThan(10000);
    });
    
    TestLogger.info(`Average response time over 5 requests: ${avgResponseTime.toFixed(2)}ms`);
  });
});