import axios, { AxiosError } from 'axios';
import { WeatherService } from '../services/weather-service';
import { TestHelpers } from '../utils/test-helpers';
import { TestLogger } from '../utils/logger';

describe('OpenWeatherMap API - Forecast Tests', () => {
  let weatherService: WeatherService;

  beforeAll(() => {
    weatherService = new WeatherService();
    TestLogger.info('🌦️ Starting Forecast API Tests');
  });

  describe('Happy Path Tests', () => {
    test('should get 5-day forecast by city name', async () => {
      const response = await weatherService.getForecastByCity('London');

      TestHelpers.validateForecastResponse(response);
      expect(response.data.city.name.toLowerCase()).toContain('london');

      // Should have multiple forecast entries
      expect(response.data.list.length).toBeGreaterThan(0);
      expect(response.data.list.length).toBeLessThanOrEqual(40); // 5 days * 8 entries
    });

    test('should get forecast by coordinates', async () => {
      const lat = 40.7128;
      const lon = -74.0060; // New York

      const response = await weatherService.getForecastByCoordinates(lat, lon);

      TestHelpers.validateForecastResponse(response);
      expect(response.data.city.coord.lat).toBeCloseTo(lat, 1);
      expect(response.data.city.coord.lon).toBeCloseTo(lon, 1);
    });

    test('should return forecast with proper 3-hour intervals', async () => {
      const response = await weatherService.getForecastByCity('Tokyo');

      TestHelpers.validateForecastResponse(response);
      const forecasts = response.data.list;

      for (let i = 1; i < forecasts.length; i++) {
        const interval = forecasts[i].dt - forecasts[i - 1].dt;
        expect(interval).toBeGreaterThanOrEqual(3 * 3600 - 60); // allow ~1 min drift
        expect(interval).toBeLessThanOrEqual(3 * 3600 + 60);
        expect(forecasts[i].dt).toBeGreaterThan(forecasts[i - 1].dt);
      }

      forecasts.forEach(forecast => {
        expect(forecast.dt).toBeDefined();
        expect(forecast.main).toBeDefined();
        expect(forecast.weather).toBeDefined();
        expect(forecast.dt_txt).toBeDefined();
      });
    });

    test('should get forecast with different units (metric vs imperial)', async () => {
      const [metricResponse, imperialResponse] = await Promise.all([
        weatherService.getForecastByCity('Paris', 'FR', 'metric'),
        weatherService.getForecastByCity('Paris', 'FR', 'imperial')
      ]);

      TestHelpers.validateForecastResponse(metricResponse);
      TestHelpers.validateForecastResponse(imperialResponse);

      expect(metricResponse.data.list[0].main.temp)
        .not.toBe(imperialResponse.data.list[0].main.temp);
    });
  });

  describe('Unhappy Path Tests', () => {
    test('should handle invalid city for forecast', async () => {
      try {
        await weatherService.getForecastByCity('NonExistentCity123456789');
        fail('Expected request to fail');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          TestHelpers.validateErrorResponse(error, 404);
        } else {
          throw error; // rethrow unexpected errors
        }
      }
    });

    test('should handle invalid coordinates for forecast', async () => {
      try {
        await weatherService.getForecastByCoordinates(999, 999);
        fail('Expected request to fail');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error.response?.status).toBe(400);
        } else {
          throw error;
        }
      }
    });

    test('should handle empty city name for forecast', async () => {
      try {
        await weatherService.getForecastByCity('');
        fail('Expected request to fail');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect([400, 404]).toContain(error.response?.status);
        } else {
          throw error;
        }
      }
    });
  });

  describe('Data Validation Tests', () => {
    test('should validate forecast data structure and ranges', async () => {
      const response = await weatherService.getForecastByCity('Berlin');

      TestHelpers.validateForecastResponse(response);

      response.data.list.forEach(forecast => {
        // Temperature range
        expect(forecast.main.temp).toBeGreaterThan(-100);
        expect(forecast.main.temp).toBeLessThan(70);

        // Humidity range
        expect(forecast.main.humidity).toBeGreaterThanOrEqual(0);
        expect(forecast.main.humidity).toBeLessThanOrEqual(100);

        // Weather array validation
        expect(Array.isArray(forecast.weather)).toBe(true);
        expect(forecast.weather.length).toBeGreaterThan(0);

        forecast.weather.forEach(weather => {
          expect(weather.id).toBeDefined();
          expect(weather.main).toBeDefined();
          expect(weather.description).toBeDefined();
        });
      });
    });
  });
});