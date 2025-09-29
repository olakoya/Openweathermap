"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestLogger = void 0;

var TestLogger = /** @class */ (function () {
    function TestLogger() {}

    TestLogger.info = function (message) {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    };

    TestLogger.error = function (message, error) {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
        if (error) {
            if (error.response) {
                // Axios error with response
                console.error("Status:", error.response.status);
                console.error("Data:", error.response.data);
                console.error("URL:", error.response.config?.url);
            } else if (error.request) {
                // Request was made but no response
                console.error("No response received");
                console.error("Request headers:", error.request._header || error.request);
            } else if (error.message) {
                // Generic error
                console.error("Error message:", error.message);
            } else {
                // Fallback (avoid circular)
                console.error("Error (stringified):", String(error));
            }
        }
    };

    TestLogger.debug = function (message) {
        if (process.env.ENABLE_DETAILED_LOGGING === "true") {
            console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`);
        }
    };

    return TestLogger;
}());
exports.TestLogger = TestLogger;
