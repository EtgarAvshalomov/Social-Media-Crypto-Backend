"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthResponseError = void 0;
const util_js_1 = require("./util.js");
class OAuthResponseError extends Error {
    constructor(response, payload) {
        const objPayload = typeof payload === 'object' ? payload : undefined;
        const error = (0, util_js_1.ifString)(objPayload?.['error']);
        const errorDescription = (0, util_js_1.ifString)(objPayload?.['error_description']);
        const messageError = error ? `"${error}"` : 'unknown';
        const messageDesc = errorDescription ? `: ${errorDescription}` : '';
        const message = `OAuth ${messageError} error${messageDesc}`;
        super(message);
        Object.defineProperty(this, "response", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: response
        });
        Object.defineProperty(this, "payload", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: payload
        });
        Object.defineProperty(this, "error", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "errorDescription", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.error = error;
        this.errorDescription = errorDescription;
    }
    get status() {
        return this.response.status;
    }
    get headers() {
        return this.response.headers;
    }
}
exports.OAuthResponseError = OAuthResponseError;
//# sourceMappingURL=oauth-response-error.js.map