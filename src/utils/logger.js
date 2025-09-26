"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestLogger = void 0;
var TestLogger = /** @class */ (function () {
    function TestLogger() {
    }
    TestLogger.info = function (message) {
        console.log("[INFO] ".concat(new Date().toISOString(), " - ").concat(message));
    };
    TestLogger.error = function (message, error) {
        console.error("[ERROR] ".concat(new Date().toISOString(), " - ").concat(message));
        if (error) {
            console.error(error);
        }
    };
    TestLogger.debug = function (message) {
        if (process.env.ENABLE_DETAILED_LOGGING === 'true') {
            console.log("[DEBUG] ".concat(new Date().toISOString(), " - ").concat(message));
        }
    };
    return TestLogger;
}());
exports.TestLogger = TestLogger;
