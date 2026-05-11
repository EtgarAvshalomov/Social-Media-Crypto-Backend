"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleResolverError = void 0;
class HandleResolverError extends Error {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'HandleResolverError'
        });
    }
}
exports.HandleResolverError = HandleResolverError;
//# sourceMappingURL=handle-resolver-error.js.map