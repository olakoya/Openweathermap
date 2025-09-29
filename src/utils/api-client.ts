import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { testConfig } from '../config/test-config';
import { TestLogger } from './logger';
import { WeatherResponse, ForecastResponse } from '../types/weather-types';

export class ApiClient {
  private client: AxiosInstance;

  constructor() {
    // Replace the old axios.create() with this:
    this.client = axios.create({
      baseURL: testConfig.baseUrl,
      timeout: testConfig.timeout,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'OpenWeatherMap-Test-Suite/1.0',
      },
      params: { appid: testConfig.apiKey } // <-- add default API key here
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config) => {
        TestLogger.debug(`Making request to: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        TestLogger.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        TestLogger.debug(`Response received: ${response.status} from ${response.config.url}`);
        return response;
      },
      (error: AxiosError) => {
        TestLogger.error(`Response error: ${error.response?.status} - ${error.message}`);
        return Promise.reject(error);
      }
    );
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<AxiosResponse<T>> {
    const requestParams = {
      ...params,
      appid: testConfig.apiKey,
    };

    return this.client.get<T>(endpoint, { params: requestParams });
  }

  // Convenience methods
  async getWeather(
    cityOrLat: string | number,
    countryOrLon?: string | number,
    units: string = 'metric'
  ): Promise<AxiosResponse<WeatherResponse>> {
    let params: Record<string, any> = { units };

    if (typeof cityOrLat === 'string') {
      // City, optional country
      params.q = countryOrLon ? `${cityOrLat},${countryOrLon}` : cityOrLat;
    } else {
      // Coordinates
      params.lat = cityOrLat;
      params.lon = countryOrLon;
    }

    return this.get<WeatherResponse>('/weather', params);
  }

  async getForecast(
    cityOrLat: string | number,
    countryOrLon?: string | number,
    units: string = 'metric'
  ): Promise<AxiosResponse<ForecastResponse>> {
    let params: Record<string, any> = { units };

    if (typeof cityOrLat === 'string') {
      params.q = countryOrLon ? `${cityOrLat},${countryOrLon}` : cityOrLat;
    } else {
      params.lat = cityOrLat;
      params.lon = countryOrLon;
    }

    return this.get<ForecastResponse>('/forecast', params);
  }
}

// Export single instance functions for easier use in tests
const apiClient = new ApiClient();

export const getWeather = (
  cityOrLat: string | number,
  countryOrLon?: string | number,
  units: string = 'metric'
) => apiClient.getWeather(cityOrLat, countryOrLon, units);

export const getForecast = (
  cityOrLat: string | number,
  countryOrLon?: string | number,
  units: string = 'metric'
) => apiClient.getForecast(cityOrLat, countryOrLon, units);
