"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestLogger = void 0;

function safeStringify(obj) {
    const seen = new WeakSet();
    return JSON.stringify(obj, function (key, value) {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) return "[Circular]";
            seen.add(value);
        }
        return value;
    }, 2);
}

var TestLogger = /** @class */ (function () {
    function TestLogger() {}

    TestLogger.info = function (message) {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    };

    TestLogger.error = function (message, error) {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
        if (error) {
            if (error.response) {
                console.error("Status:", error.response.status);
                console.error("Data:", safeStringify(error.response.data));
            } else if (error.request) {
                console.error("No response received:", safeStringify(error.request));
            } else {
                console.error("Message:", error.message);
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
