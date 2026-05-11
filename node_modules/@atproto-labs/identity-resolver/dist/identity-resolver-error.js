"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityResolverError = void 0;
class IdentityResolverError extends Error {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'IdentityResolverError'
        });
    }
}
exports.IdentityResolverError = IdentityResolverError;
//# sourceMappingURL=identity-resolver-error.js.map