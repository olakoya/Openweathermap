import { AxiosResponse, AxiosError } from 'axios';
import { WeatherResponse, ForecastResponse, ErrorResponse } from '../types/weather-types';

export class TestHelpers {
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

  static validateErrorResponse(error: AxiosError, expectedCode: number): void {
    expect(error.response).toBeDefined();
    expect(error.response!.status).toBe(expectedCode);
    
    const errorData = error.response!.data as ErrorResponse;
    expect(errorData.cod).toBe(expectedCode);
    expect(errorData.message).toBeDefined();
    expect(typeof errorData.message).toBe('string');
  }

  static generateTestCoordinates(): { lat: number; lon: number } {
    return {
      lat: Math.random() * 180 - 90,  // -90 to 90
      lon: Math.random() * 360 - 180  // -180 to 180
    };
  }

  static getTestCities(): Array<{ name: string; country?: string }> {
    return [
      { name: 'London', country: 'GB' },
      { name: 'New York', country: 'US' },
      { name: 'Tokyo', country: 'JP' },
      { name: 'Sydney', country: 'AU' },
      { name: 'Paris', country: 'FR' }
    ];
  }

  static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
