import { ApiClient } from '../utils/api-client';
import { WeatherResponse, ForecastResponse } from '../types/weather-types';
import { AxiosResponse } from 'axios';

export class WeatherService {
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  async getCurrentWeatherByCity(
    city: string, 
    country?: string, 
    units: string = 'metric'
  ): Promise<AxiosResponse<WeatherResponse>> {
    const q = country ? `${city},${country}` : city;
    return this.apiClient.get<WeatherResponse>('/weather', { q, units });
  }

  async getCurrentWeatherByCoordinates(
    lat: number, 
    lon: number, 
    units: string = 'metric'
  ): Promise<AxiosResponse<WeatherResponse>> {
    return this.apiClient.get<WeatherResponse>('/weather', { lat, lon, units });
  }

  async getCurrentWeatherByCityId(
    id: number, 
    units: string = 'metric'
  ): Promise<AxiosResponse<WeatherResponse>> {
    return this.apiClient.get<WeatherResponse>('/weather', { id, units });
  }

  async getForecastByCity(
    city: string, 
    country?: string, 
    units: string = 'metric'
  ): Promise<AxiosResponse<ForecastResponse>> {
    const q = country ? `${city},${country}` : city;
    return this.apiClient.get<ForecastResponse>('/forecast', { q, units });
  }

  async getForecastByCoordinates(
    lat: number, 
    lon: number, 
    units: string = 'metric'
  ): Promise<AxiosResponse<ForecastResponse>> {
    return this.apiClient.get<ForecastResponse>('/forecast', { lat, lon, units });
  }
}