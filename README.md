# OpenWeatherMap API Test Automation Framework

A comprehensive TypeScript-based test automation framework for the OpenWeatherMap API, featuring extensive test coverage, CI/CD integration, and professional reporting.

## 🌟 Features

- **Comprehensive API Testing**: Current weather and forecast endpoints
- **Multiple Test Types**: Happy path, unhappy path, edge cases, performance, and integration tests
- **TypeScript**: Fully typed codebase with strict type checking
- **Professional Architecture**: Service layer, utilities, and reusable components
- **CI/CD Integration**: GitHub Actions workflow with multi-node testing
- **Rich Reporting**: HTML and JUnit reports with coverage analysis
- **Error Handling**: Robust error handling and validation
- **Performance Testing**: Response time validation and concurrent request testing

## 📋 Test Coverage

### Current Weather API Tests
- ✅ Get weather by city name
- ✅ Get weather by city name with country code
- ✅ Get weather by coordinates
- ✅ Get weather with different units (metric/imperial)
- ✅ Multiple cities testing
- ✅ Temperature range validation
- ❌ Invalid city names
- ❌ Invalid coordinates
- ❌ Invalid city IDs
- ❌ Empty parameters
- ❌ Malformed country codes
- 🔄 Edge cases (boundary coordinates, special characters)

### Forecast API Tests
- ✅ 5-day forecast by city name
- ✅ Forecast by coordinates
- ✅ Time interval validation
- ✅ Different units testing
- ❌ Invalid city for forecast
- ❌ Invalid coordinates for forecast
- ❌ Empty parameters
- 🔍 Data structure validation

### Performance Tests
- ⚡ Response time validation
- ⚡ Concurrent requests handling
- ⚡ Multiple API calls without degradation

### Integration Tests
- 🔗 Current weather + forecast consistency
- 🔗 Different methods same location
- 🔗 Data consistency across requests

## 🛠️ Prerequisites

- **Node.js**: Version 18.x or 20.x
- **npm**: Version 8+
- **OpenWeatherMap API Key**: Free registration at [OpenWeatherMap](https://openweathermap.org/api)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd openweathermap-api-tests
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configuration

Create a `.env` file in the root directory:

```env
OPENWEATHER_API_KEY=your_api_key_here
OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
TEST_TIMEOUT=30000
ENABLE_DETAILED_LOGGING=false
```

> **Note**: Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

### 4. Run Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch

# Run CI mode (for pipelines)
npm run test:ci
```

## 📊 Test Reports

### HTML Report
After running tests, open `./test-results/test-report.html` in your browser for a detailed interactive report.

### Coverage Report
Coverage reports are generated in `./coverage/lcov-report/index.html`

### JUnit XML
JUnit XML reports are available at `./test-results/junit.xml` for CI/CD integration.

## 🏗️ Project Structure

```
src/
├── __tests__/              # Test files
│   ├── weather-api.test.ts  # Current weather tests
│   ├── forecast-api.test.ts # Forecast tests
│   ├── performance.test.ts  # Performance tests
│   └── integration.test.ts  # Integration tests
├── config/                  # Configuration
│   └── test-config.ts      # Test configuration
├── services/               # Service layer
│   └── weather-service.ts  # Weather API service
├── types/                  # TypeScript types
│   └── weather-types.ts    # API response types
├── utils/                  # Utilities
│   ├── api-client.ts       # HTTP client wrapper
│   ├── logger.ts           # Test logger
│   └── test-helpers.ts     # Test utilities
└── test-setup.ts           # Global test setup
```

## 🔄 CI/CD Integration

### GitHub Actions

The project includes a complete GitHub Actions workflow (`.github/workflows/ci.yml`) that:

- Runs tests on multiple Node.js versions (18.x, 20.x)
- Executes linting and tests
- Generates and uploads test reports
- Runs performance tests separately
- Uploads coverage to Codecov
- Triggers on push, PR, and daily schedule

### Setup Instructions

1. **Add Repository Secrets**:
   - `OPENWEATHER_API_KEY`: Your OpenWeatherMap API key

2. **Enable GitHub Actions**:
   - Push to `main` or `develop` branch
   - Create a pull request
   - Manual workflow dispatch

### Pipeline Stages

1. **Build & Lint**: Code quality checks
2. **Test**: Comprehensive test execution
3. **Performance**: Dedicated performance testing
4. **Report**: Artifact upload and coverage reporting

## 🧪 Test Scenarios

### Happy Path Tests
- Valid API requests with expected responses
- Different parameter combinations
- Multiple data formats and units
- Successful data retrieval and validation

### Unhappy Path Tests
- Invalid parameters and inputs
- Non-existent locations
- Malformed requests
- Error response validation

### Edge Cases
- Boundary coordinates (poles, date line)
- Special characters in city names
- Extremely long input strings
- Rate limiting scenarios

### Performance Tests
- Response time validation (< 5 seconds)
- Concurrent request handling
- Multiple sequential requests
- Resource usage optimization

## 🔧 Common Commands

```bash
# Development
npm run build          # Compile TypeScript
npm run lint           # Run ESLint
npm run lint:fix       # Fix linting issues
npm run clean          # Clean build artifacts

# Testing
npm test              # Run all tests
npm run test:coverage # Run with coverage
npm run test:watch    # Watch mode
npm run test:ci       # CI mode with reports
```

## 📚 API Documentation

### WeatherService Methods

```typescript
// Current weather
getCurrentWeatherByCity(city: string, country?: string, units?: string)
getCurrentWeatherByCoordinates(lat: number, lon: number, units?: string)
getCurrentWeatherByCityId(id: number, units?: string)

// Forecast
getForecastByCity(city: string, country?: string, units?: string)
getForecastByCoordinates(lat: number, lon: number, units?: string)
```

### Supported Units
- `metric`: Celsius, meters/sec, hectopascals
- `imperial`: Fahrenheit, miles/hour, hectopascals
- `standard`: Kelvin, meters/sec, hectopascals (default)

## 🐛 Troubleshooting

### Common Issues

1. **API Key Missing**
   ```
   Error: OPENWEATHER_API_KEY environment variable is required
   ```
   Solution: Add your API key to `.env` file

2. **Rate Limiting**
   ```
   Error: 429 Too Many Requests
   ```
   Solution: Add delays between requests or upgrade API plan

3. **Network Timeouts**
   ```
   Error: timeout of 30000ms exceeded
   ```
   Solution: Increase `TEST_TIMEOUT` in `.env` file

4. **Invalid Location**
   ```
   Error: 404 city not found
   ```
   Solution: Check city name spelling and country code

## 📈 Performance Considerations

- **Rate Limits**: Free tier allows 60 calls/minute
- **Response Times**: Typically < 2 seconds
- **Concurrent Requests**: Limited by rate limits
- **Best Practices**: Implement delays between requests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review OpenWeatherMap API documentation

---

## 🎯 Answers to Technical Test Questions

### 1. Time Spent and Potential Additions

**Time Spent**: This comprehensive test suite represents approximately 6-8 hours of development time.

**Additional Features with More Time**:
- **Advanced Mocking**: Mock server implementation for offline testing
- **Data-Driven Tests**: CSV/JSON test data files for parameterized testing
- **Visual Regression**: Screenshots and visual comparisons for weather maps
- **Load Testing**: Artillery.js or K6 integration for stress testing
- **Monitoring**: Real-time API health monitoring and alerting
- **Multi-Environment**: Staging, production environment configurations
- **Database Integration**: Test result persistence and historical analysis
- **Advanced Reporting**: Dashboard with trends and analytics
- **Security Testing**: API key rotation and security vulnerability scanning
- **Contract Testing**: Pact.js for API contract validation

### 2. Self Description in JSON

```json
{
  "name": "OpenWeatherMap Test Automation Framework",
  "type": "QA Automation Suite",
  "version": "1.0.0",
  "technologies": [
    "TypeScript",
    "Jest",
    "Node.js",
    "GitHub Actions",
    "Axios"
  ],
  "capabilities": {
    "testing": {
      "types": ["unit", "integration", "performance", "API"],
      "coverage": "comprehensive",
      "reporting": ["HTML", "JUnit", "Coverage"],
      "automation": true
    },
    "architecture": {
      "pattern": "service-layer",
      "principles": ["DRY", "SOLID", "clean-code"],
      "scalability": "high",
      "maintainability": "excellent"
    },
    "ci_cd": {
      "platforms": ["GitHub Actions"],
      "features": ["multi-node", "artifacts", "coverage"],
      "scheduling": "daily"
    }
  },
  "strengths": [
    "comprehensive test coverage",
    "professional code organization",
    "robust error handling",
    "detailed documentation",
    "CI/CD integration",
    "performance testing"
  ],
  "metrics": {
    "test_files": 4,
    "test_cases": "50+",
    "code_coverage": "high",
    "documentation": "extensive"
  }
}
```

### 3. Performance Testing Approach

**Strategy for Performance Testing**:

1. **Load Testing**
   - **Tool**: Artillery.js or K6
   - **Metrics**: Response time, throughput, error rates
   - **Scenarios**: Gradual load increase, spike testing, sustained load
   - **Implementation**:
   ```yaml
   # artillery-config.yml
   config:
     target: 'https://api.openweathermap.org'
     phases:
       - duration: 60
         arrivalRate: 10
       - duration: 120
         arrivalRate: 50
   scenarios:
     - name: "Weather API Load Test"
       requests:
         - get:
             url: "/data/2.5/weather?q=London&appid={{ $env.API_KEY }}"
   ```

2. **Performance Benchmarks**
   - **Response Time**: < 2 seconds (95th percentile)
   - **Availability**: > 99.5% uptime
   - **Throughput**: Handle rate limit efficiently
   - **Error Rate**: < 0.1% for valid requests

3. **Monitoring Setup**
   - **Real-time Dashboards**: Grafana with InfluxDB
   - **Alerting**: Slack/email notifications for SLA breaches
   - **Historical Analysis**: Performance trend analysis
   - **Synthetic Monitoring**: Regular health checks

4. **Test Environment**
   - **Isolated Testing**: Separate API keys for performance tests
   - **Data Preparation**: Pre-validated test datasets
   - **Resource Monitoring**: CPU, memory, network utilization
   - **Baseline Establishment**: Performance regression detection

This framework provides a solid foundation for comprehensive API testing with professional-grade features and industry best practices.