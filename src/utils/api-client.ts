import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { testConfig } from '../config/test-config';
import { TestLogger } from './logger';

export class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: testConfig.baseUrl,
      timeout: testConfig.timeout,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'OpenWeatherMap-Test-Suite/1.0'
      }
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
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

    // Response interceptor
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
      appid: testConfig.apiKey
    };

    return this.client.get<T>(endpoint, { params: requestParams });
  }
}