import { WeatherService } from '../services/weather-service';
import { TestHelpers } from '../utils/test-helpers';
import { TestLogger } from '../utils/logger';

describe('OpenWeatherMap API - Integration Tests', () => {
  let weatherService: WeatherService;

  beforeAll(() => {
    weatherService = new WeatherService();
    TestLogger.info('🔗 Starting Integration Tests');
  });

  test('should get current weather and forecast for the same location', async () => {
    const city = 'Stockholm';
    const country = 'SE';
    
    const [currentWeather, forecast] = await Promise.all([
      weatherService.getCurrentWeatherByCity(city, country),
      weatherService.getForecastByCity(city, country)
    ]);
    
    TestHelpers.validateWeatherResponse(currentWeather);
    TestHelpers.validateForecastResponse(forecast);
    
    // Both are for the same location
    expect(currentWeather.data.name).toBe(forecast.data.city.name);
    expect(currentWeather.data.sys.country).toBe(forecast.data.city.country);
    
    // Coordinates match (within reasonable precision)
    expect(currentWeather.data.coord.lat).toBeCloseTo(forecast.data.city.coord.lat, 1);
    expect(currentWeather.data.coord.lon).toBeCloseTo(forecast.data.city.coord.lon, 1);
  });

  test('should get weather by different methods for same location', async () => {
    const lat = 59.3293;
    const lon = 18.0686; // Stockholm coordinates
    
    const [weatherByCoords, weatherByCity] = await Promise.all([
      weatherService.getCurrentWeatherByCoordinates(lat, lon),
      weatherService.getCurrentWeatherByCity('Stockholm', 'SE')
    ]);
    
    TestHelpers.validateWeatherResponse(weatherByCoords);
    TestHelpers.validateWeatherResponse(weatherByCity);
    
    // The same for general location
    expect(weatherByCoords.data.sys.country).toBe(weatherByCity.data.sys.country);
    expect(weatherByCoords.data.coord.lat).toBeCloseTo(weatherByCity.data.coord.lat, 1);
    expect(weatherByCoords.data.coord.lon).toBeCloseTo(weatherByCity.data.coord.lon, 1);
  });

  test('should maintain data consistency across requests', async () => {
    const responses = await Promise.all([
      weatherService.getCurrentWeatherByCity('Vancouver', 'CA'),
      weatherService.getCurrentWeatherByCity('Vancouver', 'CA'),
      weatherService.getCurrentWeatherByCity('Vancouver', 'CA')
    ]);
    
    responses.forEach(response => {
      TestHelpers.validateWeatherResponse(response);
    });
    
    // All responses are for the same location
    const firstResponse = responses[0].data;
    responses.slice(1).forEach(response => {
      expect(response.data.id).toBe(firstResponse.id);
      expect(response.data.name).toBe(firstResponse.name);
      expect(response.data.sys.country).toBe(firstResponse.sys.country);
    });
  });
});



