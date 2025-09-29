# OpenWeatherMap API Test Automation Framework

A professional test automation framework for OpenWeatherMap API, designed for robust backend QA validation. Includes functional, integration, and performance tests, environment configuration, and reporting.

---

## Overview

This project demonstrates:

- Comprehensive API testing of OpenWeatherMap endpoints (Current Weather, Forecast)
- Automated load and spike testing using Artillery
- Configuration-driven testing with `.env` support
- Clear reporting for CI/CD integration
- Reusable and maintainable test architecture

---

## Features

- **Functional Tests**: Validations for happy path, edge cases, and negative scenarios  
- **Integration Tests**: Consistency between endpoints and response validations  
- **Performance Tests**: Load and spike testing with Artillery  
- **Environment Configurable**: `.env` file for API keys and base URL  
- **Reporting**: Console output, HTML, and JUnit reports for CI pipelines  
- **Clean Architecture**: Service layer, reusable utilities, and structured test files  

---

## Project Structure

```text
perf/                     # Performance test files (Artillery)
  ├── api-load-test.yml
  ├── api-spike-test.yml
  └── api-smoke-test.yml

src/                      # API service and helper scripts
  ├── services/
  │     └── weather-service.ts
  └── utils/
        ├── api-client.ts
        ├── logger.ts
        └── test-helpers.ts


screenshots               # Manual or automated test screenshots
.env                      # Environment variables
README.md                 # Documentation
package.json              # Dependencies and scripts


---

## Prerequisites

- Node.js v18.x or higher  
- npm v8+  
- OpenWeatherMap API key (free registration at [OpenWeatherMap](https://openweathermap.org/api))  

---

## Setup

1. Clone the repository:

```bash
git clone <https://github.com/olakoya/Openweathermap.git>
cd openweathermap-api-tests

2. Install dependencies:

npm install

3. Create a .env file in the root:

OPENWEATHER_API_KEY=6c56beaa584b27613820fcd4f1de63ed (my registered api-key)
OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
TEST_TIMEOUT=30000
ENABLE_DETAILED_LOGGING=true

----

## Running Tests

1. Functional & Integration Tests (Jest + TypeScript)

npm test
npm run test:coverage    # With coverage reports
npm run test:ci          # For CI/CD pipelines

2. Performance Tests (Artillery)

- Load Testing:
npx dotenv -e .env -- npx artillery run perf/api-load-test.yml

- Spike Testing:
npx dotenv -e .env -- npx artillery run perf/api-spike-test.yml

- Smoke Testing:
npx dotenv -e .env -- npx artillery run perf/api-smoke-test.yml

----

## Reporting

HTML Reports: ./test-results/test-report.html

Coverage Reports: ./coverage/lcov-report/index.html

JUnit XML Reports: ./test-results/junit.xml (for CI/CD)

---

## Test Scenarios

1. Functional Tests

- Positive Path: Get current weather by city name, coordinates, and city ID

- Positive Path: Validate response data types and temperature ranges

- Negative Path: Handle invalid cities, coordinates, and parameters

- Edge cases (boundary coordinates, special characters)

2. Forecast API

- Positive Path: Get 5-day forecast by city or coordinates

- Positive Path: Validate time intervals and units

- Negative Path: Invalid inputs handled gracefully

3. Performance Tests

- Load and spike testing

- Validate response time (< 2s)

- Monitor errors and throughput

4. Integration Tests

- Compare current weather vs forecast consistency

- Multiple methods same location validations

---

## CI/CD Integration

- GitHub Actions workflow included (.github/workflows/ci.yml)

- Multi-node testing for Node.js 18 & 20

- Linting, tests, performance tests, and artifact reporting

- Requires repository secret: OPENWEATHER_API_KEY

---

## Troubleshooting

- Invalid API Key / Missing Env Variable: Ensure .env has OPENWEATHER_API_KEY

- Rate Limiting (HTTP 429): Reduce requests or upgrade plan

- Invalid Location (HTTP 404): Verify city name and country code

- Timeouts: Increase TEST_TIMEOUT in .env

---

## Performance Considerations

- Free-tier rate limit: 60 requests/min

- Typical response: < 2s

- Concurrent requests limited by rate limits

---

## Contributing

- Fork the repository

- Add/modify tests or utilities

- Submit a pull request after validation

---

## License

MIT License

---

## Summary for Application

Role: Backend QA Engineer

1. Skills Demonstrated:

- API functional & performance testing

- TypeScript automation & best practices

- CI/CD integration with GitHub Actions

- Environment & config management

- Professional test architecture & reporting

2. Deliverables:

- Functional, integration, and performance tests

- Configurable .env environment

- CI-ready pipelines and structured reporting

Author: OLA KOYA
