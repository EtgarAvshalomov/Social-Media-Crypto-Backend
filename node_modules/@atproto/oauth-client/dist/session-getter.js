"use strict";
var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        var r, s = 0;
        function next() {
            while (r = env.stack.pop()) {
                try {
                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                    if (r.dispose) {
                        var result = r.dispose.call(r.value);
                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                    }
                    else s |= 1;
                }
                catch (e) {
                    fail(e);
                }
            }
            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionGetter = void 0;
exports.isExpectedSessionError = isExpectedSessionError;
const simple_store_1 = require("@atproto-labs/simple-store");
const auth_method_unsatisfiable_error_js_1 = require("./errors/auth-method-unsatisfiable-error.js");
const token_invalid_error_js_1 = require("./errors/token-invalid-error.js");
const token_refresh_error_js_1 = require("./errors/token-refresh-error.js");
const token_revoked_error_js_1 = require("./errors/token-revoked-error.js");
const oauth_response_error_js_1 = require("./oauth-response-error.js");
const util_js_1 = require("./util.js");
function isExpectedSessionError(err) {
    return (err instanceof token_refresh_error_js_1.TokenRefreshError ||
        err instanceof token_revoked_error_js_1.TokenRevokedError ||
        err instanceof token_invalid_error_js_1.TokenInvalidError ||
        err instanceof auth_method_unsatisfiable_error_js_1.AuthMethodUnsatisfiableError ||
        // The stored session is invalid (e.g. missing properties) and cannot
        // be used properly
        err instanceof TypeError);
}
/**
 * There are several advantages to wrapping the sessionStore in a (single)
 * CachedGetter, the main of which is that the cached getter will ensure that at
 * most one fresh call is ever being made. Another advantage, is that it
 * contains the logic for reading from the cache which, if the cache is based on
 * localStorage/indexedDB, will sync across multiple tabs (for a given sub).
 */
class SessionGetter extends simple_store_1.CachedGetter {
    constructor(sessionStore, serverFactory, runtime, hooks = {}) {
        super(async (sub, { signal }, storedSession) => {
            // There needs to be a previous session to be able to refresh. If
            // storedSession is undefined, it means that the store does not contain
            // a session for the given sub.
            if (storedSession === undefined) {
                // Because the session is not in the store, this.delStored() method
                // will not be called by the CachedGetter class (because there is
                // nothing to delete). This would typically happen if there is no
                // synchronization mechanism between instances of this class. Let's
                // make sure an event is dispatched here if this occurs.
                const msg = 'The session was deleted by another process';
                const cause = new token_refresh_error_js_1.TokenRefreshError(sub, msg);
                await hooks.onDelete?.call(null, sub, cause);
                throw cause;
            }
            // @NOTE Throwing a TokenRefreshError (or any other error class defined
            // in the deleteOnError options) will result in this.delStored() being
            // called.
            const { dpopKey, authMethod, tokenSet } = storedSession;
            if (sub !== tokenSet.sub) {
                // Fool-proofing (e.g. against invalid session storage)
                throw new token_refresh_error_js_1.TokenRefreshError(sub, 'Stored session sub mismatch');
            }
            if (!tokenSet.refresh_token) {
                throw new token_refresh_error_js_1.TokenRefreshError(sub, 'No refresh token available');
            }
            const server = await serverFactory.fromIssuer(tokenSet.iss, authMethod, dpopKey);
            // Because refresh tokens can only be used once, we must not use the
            // "signal" to abort the refresh, or throw any abort error beyond this
            // point. Any thrown error beyond this point will prevent the
            // TokenGetter from obtaining, and storing, the new token set,
            // effectively rendering the currently saved session unusable.
            signal?.throwIfAborted();
            try {
                const newTokenSet = await server.refresh(tokenSet);
                if (sub !== newTokenSet.sub) {
                    // The server returned another sub. Was the tokenSet manipulated?
                    throw new token_refresh_error_js_1.TokenRefreshError(sub, 'Token set sub mismatch');
                }
                return {
                    dpopKey,
                    tokenSet: newTokenSet,
                    authMethod: server.authMethod,
                };
            }
            catch (cause) {
                // Since refresh tokens can only be used once, we might run into
                // concurrency issues if multiple instances (e.g. browser tabs) are
                // trying to refresh the same token simultaneously. The chances of
                // this happening when multiple instances are started simultaneously
                // is reduced by randomizing the expiry time (see isStale() below).
                // The best solution is to use a mutex/lock to ensure that only one
                // instance is refreshing the token at a time (runtime.usingLock) but
                // that is not always possible. Let's try to recover from concurrency
                // issues, or force the session to be deleted by throwing a
                // TokenRefreshError.
                if (cause instanceof oauth_response_error_js_1.OAuthResponseError &&
                    cause.status === 400 &&
                    cause.error === 'invalid_grant') {
                    // In case there is no lock implementation in the runtime, we will
                    // wait for a short time to give the other concurrent instances a
                    // chance to finish their refreshing of the token. If a concurrent
                    // refresh did occur, we will pretend that this one succeeded.
                    if (!runtime.hasImplementationLock) {
                        await new Promise((r) => setTimeout(r, 1000));
                        const stored = await this.getStored(sub);
                        if (stored === undefined) {
                            // A concurrent refresh occurred and caused the session to be
                            // deleted (for a reason we can't know at this point).
                            // Using a distinct error message mainly for debugging
                            // purposes. Also, throwing a TokenRefreshError to trigger
                            // deletion through the deleteOnError callback.
                            const msg = 'The session was deleted by another process';
                            throw new token_refresh_error_js_1.TokenRefreshError(sub, msg, { cause });
                        }
                        else if (stored.tokenSet.access_token !== tokenSet.access_token ||
                            stored.tokenSet.refresh_token !== tokenSet.refresh_token) {
                            // A concurrent refresh occurred. Pretend this one succeeded.
                            return stored;
                        }
                        else {
                            // There were no concurrent refresh. The token is (likely)
                            // simply no longer valid.
                        }
                    }
                    // Make sure the session gets deleted from the store
                    const msg = cause.errorDescription ?? 'The session was revoked';
                    throw new token_refresh_error_js_1.TokenRefreshError(sub, msg, { cause });
                }
                throw cause;
            }
        }, sessionStore, {
            isStale: (sub, { tokenSet }) => {
                return (tokenSet.expires_at != null &&
                    new Date(tokenSet.expires_at).getTime() <
                        Date.now() +
                            // Add some lee way to ensure the token is not expired when it
                            // reaches the server.
                            10e3 +
                            // Add some randomness to reduce the chances of multiple
                            // instances trying to refresh the token at the same.
                            30e3 * Math.random());
            },
            onStoreError: async (err, sub, { tokenSet, dpopKey, authMethod }) => {
                // If the token data cannot be stored, let's revoke it
                try {
                    const server = await serverFactory.fromIssuer(tokenSet.iss, authMethod, dpopKey);
                    await server.revoke(tokenSet.refresh_token ?? tokenSet.access_token);
                }
                catch {
                    // At least we tried...
                }
                // Attempt to delete the session from the store. Note that this might
                // fail if the store is not available, which is fine.
                try {
                    await this.delStored(sub, err);
                }
                catch {
                    // Ignore (better to propagate the original storage error)
                }
                throw err;
            },
            deleteOnError: isExpectedSessionError,
        });
        Object.defineProperty(this, "runtime", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: runtime
        });
        Object.defineProperty(this, "hooks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: hooks
        });
    }
    async getStored(sub, options) {
        return super.getStored(sub, options);
    }
    async setStored(sub, session) {
        // Prevent tampering with the stored value
        if (sub !== session.tokenSet.sub) {
            throw new TypeError('Token set does not match the expected sub');
        }
        await super.setStored(sub, session);
        await this.hooks.onUpdate?.call(null, sub, session);
    }
    async delStored(sub, cause) {
        await super.delStored(sub, cause);
        await this.hooks.onDelete?.call(null, sub, cause);
    }
    /**
     * @deprecated Use {@link getSession} instead
     * @internal (not really deprecated)
     */
    async get(sub, options) {
        const session = await this.runtime.usingLock(`@atproto-oauth-client-${sub}`, async () => {
            const env_1 = { stack: [], error: void 0, hasError: false };
            try {
                // Make sure, even if there is no signal in the options, that the
                // request will be cancelled after at most 30 seconds.
                const signal = AbortSignal.timeout(30e3);
                const abortController = __addDisposableResource(env_1, (0, util_js_1.combineSignals)([options?.signal, signal]), false);
                return await super.get(sub, {
                    ...options,
                    signal: abortController.signal,
                });
            }
            catch (e_1) {
                env_1.error = e_1;
                env_1.hasError = true;
            }
            finally {
                __disposeResources(env_1);
            }
        });
        if (sub !== session.tokenSet.sub) {
            // Fool-proofing (e.g. against invalid session storage)
            throw new Error('Token set does not match the expected sub');
        }
        return session;
    }
    /**
     * @param refresh When `true`, the credentials will be refreshed even if they
     * are not expired. When `false`, the credentials will not be refreshed even
     * if they are expired. When `undefined`, the credentials will be refreshed
     * if, and only if, they are (about to be) expired. Defaults to `undefined`.
     */
    async getSession(sub, refresh = 'auto') {
        return this.get(sub, {
            noCache: refresh === true,
            allowStale: refresh === false,
        });
    }
}
exports.SessionGetter = SessionGetter;
//# sourceMappingURL=session-getter.js.map