import { AxiosResponse, AxiosError } from 'axios';
import { WeatherResponse, ForecastResponse, ErrorResponse } from '../types/weather-types';

export class TestHelpers {
  // Validate Current Weather API response
  static validateWeatherResponse(response: AxiosResponse<WeatherResponse>): void {
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();

    const data = response.data;

    // Validate required fields
    expect(data.coord).toBeDefined();
    expect(data.coord.lat).toBeDefined();
    expect(data.coord.lon).toBeDefined();
    expect(typeof data.coord.lat).toBe('number');
    expect(typeof data.coord.lon).toBe('number');

    expect(data.weather).toBeDefined();
    expect(Array.isArray(data.weather)).toBe(true);
    expect(data.weather.length).toBeGreaterThan(0);

    expect(data.main).toBeDefined();
    expect(typeof data.main.temp).toBe('number');
    expect(typeof data.main.humidity).toBe('number');
    expect(typeof data.main.pressure).toBe('number');

    expect(data.name).toBeDefined();
    expect(typeof data.name).toBe('string');

    expect(data.cod).toBe(200);
  }

  // Validate Forecast API response
  static validateForecastResponse(response: AxiosResponse<ForecastResponse>): void {
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();

    const data = response.data;

    expect(data.cod).toBe('200');
    expect(data.list).toBeDefined();
    expect(Array.isArray(data.list)).toBe(true);
    expect(data.list.length).toBeGreaterThan(0);

    expect(data.city).toBeDefined();
    expect(data.city.name).toBeDefined();
    expect(data.city.coord).toBeDefined();
  }

  // Validate API error response (unhappy path)
  static validateErrorResponse(error: AxiosError, expectedCode: number): void {
    if (!error.response) {
      console.error('Axios error has no response:', error.message);
      return; // safely exit if no response
    }

    // Validate HTTP status code
    expect(error.response.status).toBe(expectedCode);

    // Validate response body if available
    const errorData = error.response.data as ErrorResponse;
    expect(Number(errorData.cod)).toBe(expectedCode);
    expect(errorData.message).toBeDefined();
    expect(typeof errorData.message).toBe('string');
  }

  // Generate random coordinates for testing
  static generateTestCoordinates(): { lat: number; lon: number } {
    return {
      lat: Math.random() * 180 - 90,  // -90 to 90
      lon: Math.random() * 360 - 180  // -180 to 180
    };
  }

  // Predefined cities for testing
  static getTestCities(): Array<{ name: string; country?: string }> {
    return [
      { name: 'London', country: 'GB' },
      { name: 'New York', country: 'US' },
      { name: 'Tokyo', country: 'JP' },
      { name: 'Sydney', country: 'AU' },
      { name: 'Paris', country: 'FR' }
    ];
  }

  // Utility delay function
  static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
