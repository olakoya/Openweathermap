import { getWeather, getForecast } from '../utils/api-client';
import { WeatherResponse, ForecastResponse } from '../types/weather-types';
import { AxiosResponse } from 'axios';

export class WeatherService {
  async getCurrentWeatherByCity(
    city: string,
    country?: string,
    units: string = 'metric'
  ): Promise<AxiosResponse<WeatherResponse>> {
    return getWeather(city, country, units);
  }

  async getCurrentWeatherByCoordinates(
    lat: number,
    lon: number,
    units: string = 'metric'
  ): Promise<AxiosResponse<WeatherResponse>> {
    return getWeather(lat, lon, units);
  }

  async getForecastByCity(
    city: string,
    country?: string,
    units: string = 'metric'
  ): Promise<AxiosResponse<ForecastResponse>> {
    return getForecast(city, country, units);
  }

  async getForecastByCoordinates(
    lat: number,
    lon: number,
    units: string = 'metric'
  ): Promise<AxiosResponse<ForecastResponse>> {
    return getForecast(lat, lon, units);
  }
}
