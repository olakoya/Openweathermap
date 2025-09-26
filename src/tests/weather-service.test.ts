import { WeatherService } from '../src/services/weather-service';
import { TestLogger } from '../src/utils/logger';

describe('🌤 WeatherService API Tests', () => {
  let weatherService: WeatherService;

  beforeAll(() => {
    weatherService = new WeatherService();
  });

  test('should fetch current weather by city name', async () => {
    const response = await weatherService.getCurrentWeatherByCity('London', 'GB');
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('weather');
    expect(response.data.name).toBe('London');
    TestLogger.info(`Current temperature in London: ${response.data.main.temp}°C`);
  });

  test('should fetch current weather by coordinates', async () => {
    const response = await weatherService.getCurrentWeatherByCoordinates(51.5074, -0.1278);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('coord');
    expect(response.data.coord.lat).toBeCloseTo(51.5, 1);
    expect(response.data.coord.lon).toBeCloseTo(-0.1, 1);
  });

  test('should fetch forecast by city name', async () => {
    const response = await weatherService.getForecastByCity('London', 'GB');
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('list');
    expect(Array.isArray(response.data.list)).toBe(true);
  });
});
