"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var logger_1 = require("./utils/logger");
// Load environment variables
dotenv_1.default.config();
// Global test setup
beforeAll(function () {
    logger_1.TestLogger.info('Starting OpenWeatherMap API Test Suite');
    // Validate required environment variables
    if (!process.env.OPENWEATHER_API_KEY) {
        throw new Error('OPENWEATHER_API_KEY environment variable is required');
    }
});
afterAll(function () {
    logger_1.TestLogger.info('OpenWeatherMap API Test Suite Completed');
});
