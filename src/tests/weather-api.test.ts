import { WeatherService } from '../services/weather-service';
import { TestHelpers } from '../utils/test-helpers';
import { TestLogger } from '../utils/logger';
import { AxiosError } from 'axios';

describe('OpenWeatherMap API - Current Weather Tests', () => {
  let weatherService: WeatherService;

  beforeAll(() => {
    weatherService = new WeatherService();
    TestLogger.info('🌤️ Starting Current Weather API Tests');
  });

  describe('Happy Path Tests', () => {
    test('should get current weather by city name', async () => {
      const response = await weatherService.getCurrentWeatherByCity('London');
      
      TestHelpers.validateWeatherResponse(response);
      expect(response.data.name.toLowerCase()).toContain('london');
    });

    test('should get current weather by city name with country code', async () => {
      const response = await weatherService.getCurrentWeatherByCity('London', 'GB');
      
      TestHelpers.validateWeatherResponse(response);
      expect(response.data.name).toBe('London');
      expect(response.data.sys.country).toBe('GB');
    });

    test('should get current weather by coordinates', async () => {
      // London coordinates
      const lat = 51.5074;
      const lon = -0.1278;
      
      const response = await weatherService.getCurrentWeatherByCoordinates(lat, lon);
      
      TestHelpers.validateWeatherResponse(response);
      expect(response.data.coord.lat).toBeCloseTo(lat, 1);
      expect(response.data.coord.lon).toBeCloseTo(lon, 1);
    });

    test('should get current weather with different units', async () => {
      const metricResponse = await weatherService.getCurrentWeatherByCity('London', 'GB', 'metric');
      const imperialResponse = await weatherService.getCurrentWeatherByCity('London', 'GB', 'imperial');
      
      TestHelpers.validateWeatherResponse(metricResponse);
      TestHelpers.validateWeatherResponse(imperialResponse);
      
      // Temperature values should be different between metric and imperial
      expect(metricResponse.data.main.temp).not.toBe(imperialResponse.data.main.temp);
    });

    test('should get current weather for multiple cities', async () => {
      const cities = TestHelpers.getTestCities();
      
      for (const city of cities.slice(0, 3)) { // Test first 3 to avoid rate limits
        const response = await weatherService.getCurrentWeatherByCity(city.name, city.country);
        
        TestHelpers.validateWeatherResponse(response);
        expect(response.data.name.toLowerCase()).toContain(city.name.toLowerCase());
        
        if (city.country) {
          expect(response.data.sys.country).toBe(city.country);
        }
        
        // Small delay to respect rate limits
        await TestHelpers.delay(100);
      }
    });

    test('should return reasonable temperature ranges', async () => {
      const response = await weatherService.getCurrentWeatherByCity('London');
      
      TestHelpers.validateWeatherResponse(response);
      
      // Temperature should be within reasonable bounds (-100°C to 70°C)
      expect(response.data.main.temp).toBeGreaterThan(-100);
      expect(response.data.main.temp).toBeLessThan(70);
      
      // Humidity should be between 0 and 100
      expect(response.data.main.humidity).toBeGreaterThanOrEqual(0);
      expect(response.data.main.humidity).toBeLessThanOrEqual(100);
    });
  });

  describe('Unhappy Path Tests', () => {
    test('should handle invalid city name', async () => {
      try {
        await weatherService.getCurrentWeatherByCity('InvalidCityName123456789');
        fail('Expected request to fail');
      } catch (error) {
        const axiosError = error as AxiosError;
        TestHelpers.validateErrorResponse(axiosError, 404);
      }
    });

    test('should handle invalid coordinates', async () => {
      try {
        // Invalid latitude (>90)
        await weatherService.getCurrentWeatherByCoordinates(999, 0);
        fail('Expected request to fail');
      } catch (error) {
        const axiosError = error as AxiosError;
        expect(axiosError.response?.status).toBe(400);
      }
    });

    test('should handle invalid city ID', async () => {
      try {
        await weatherService.getCurrentWeatherByCityId(999999999);
        fail('Expected request to fail');
      } catch (error) {
        const axiosError = error as AxiosError;
        TestHelpers.validateErrorResponse(axiosError, 404);
      }
    });

    test('should handle empty city name', async () => {
      try {
        await weatherService.getCurrentWeatherByCity('');
        fail('Expected request to fail');
      } catch (error) {
        const axiosError = error as AxiosError;
        expect([400, 404]).toContain(axiosError.response?.status);
      }
    });

    test('should handle malformed country code', async () => {
      try {
        await weatherService.getCurrentWeatherByCity('London', 'InvalidCountryCode123');
        fail('Expected request to fail');
      } catch (error) {
        const axiosError = error as AxiosError;
        TestHelpers.validateErrorResponse(axiosError, 404);
      }
    });

    test('should handle invalid units parameter', async () => {
      // OpenWeatherMap API typically ignores invalid units and uses default
      // But we should test that it doesn't crash
      const response = await weatherService.getCurrentWeatherByCity('London', 'GB', 'invalid_units');
      TestHelpers.validateWeatherResponse(response);
    });
  });

  describe('Edge Cases', () => {
    test('should handle coordinates at boundaries', async () => {
      const testCases = [
        { lat: 90, lon: 0 },    // North Pole
        { lat: -90, lon: 0 },   // South Pole
        { lat: 0, lon: 180 },   // International Date Line
        { lat: 0, lon: -180 }   // International Date Line (other side)
      ];

      for (const coords of testCases) {
        try {
          const response = await weatherService.getCurrentWeatherByCoordinates(coords.lat, coords.lon);
          TestHelpers.validateWeatherResponse(response);
        } catch (error) {
          // Some extreme coordinates might not have weather data
          const axiosError = error as AxiosError;
          expect([400, 404]).toContain(axiosError.response?.status);
        }
        await TestHelpers.delay(100);
      }
    });

    test('should handle special characters in city names', async () => {
      const specialCities = ['São Paulo', 'München', 'København'];
      
      for (const city of specialCities) {
        try {
          const response = await weatherService.getCurrentWeatherByCity(city);
          TestHelpers.validateWeatherResponse(response);
        } catch (error) {
          // Some special characters might not be supported
          const axiosError = error as AxiosError;
          expect([400, 404]).toContain(axiosError.response?.status);
        }
        await TestHelpers.delay(100);
      }
    });

    test('should handle very long city names', async () => {
      const longCityName = 'A'.repeat(200);
      
      try {
        await weatherService.getCurrentWeatherByCity(longCityName);
        fail('Expected request to fail');
      } catch (error) {
        const axiosError = error as AxiosError;
        expect([400, 404]).toContain(axiosError.response?.status);
      }
    });
  });
});
