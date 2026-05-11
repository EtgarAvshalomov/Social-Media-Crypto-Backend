"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachedGetter = void 0;
const returnTrue = () => true;
const returnFalse = () => false;
/**
 * Wrapper utility that uses a store to speed up the retrieval of values from an
 * (expensive) getter function.
 */
class CachedGetter {
    constructor(getter, store, options = {}) {
        Object.defineProperty(this, "getter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: getter
        });
        Object.defineProperty(this, "store", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: store
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        Object.defineProperty(this, "pending", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
    }
    async get(key, { signal, context, allowStale = false, noCache = false, } = {}) {
        signal?.throwIfAborted();
        const { isStale, deleteOnError } = this.options;
        const allowStored = noCache
            ? returnFalse // Never allow stored values to be returned
            : allowStale || isStale == null
                ? returnTrue // Always allow stored values to be returned
                : async (value) => !(await isStale(key, value));
        // As long as concurrent requests are made for the same key, only one
        // request will be made to the getStored & getter functions at a time. This
        // works because there is no async operation between the while() loop and
        // the pending.set() call below. Because of the single threaded nature of
        // JavaScript, the pending item will be set before the next iteration of the
        // while loop of any concurrent request.
        let previousExecutionFlow;
        while ((previousExecutionFlow = this.pending.get(key))) {
            try {
                // If a concurrent request is already in progress, wait for it to finish
                const { isFresh, value } = await previousExecutionFlow;
                // Use the concurrent request's result if it is fresh
                if (isFresh)
                    return value;
                // Use the concurrent request's result if not fresh (loaded from the
                // store), and matches the conditions for using a stored value.
                if (await allowStored(value))
                    return value;
            }
            catch {
                // Ignore errors from previous execution flows (they will have been
                // propagated by that flow).
            }
            // Break the loop if the signal was aborted
            signal?.throwIfAborted();
        }
        const currentExecutionFlow = Promise.resolve()
            .then(async () => {
            const storedValue = await this.getStored(key, { signal });
            if (storedValue !== undefined && (await allowStored(storedValue))) {
                // Use the stored value as return value for the current execution
                // flow. Notify other concurrent execution flows (that should be
                // "stuck" in the loop before until this promise resolves) that we got
                // a value, but that it came from the store (isFresh = false).
                return { isFresh: false, value: storedValue };
            }
            return Promise.resolve()
                .then(async () => {
                const options = { signal, noCache, context };
                return this.getter.call(null, key, options, storedValue);
            })
                .catch(async (err) => {
                if (storedValue !== undefined) {
                    try {
                        if (await deleteOnError?.(err, key, storedValue)) {
                            await this.delStored(key, err);
                        }
                    }
                    catch (error) {
                        throw new AggregateError([err, error], 'Error while deleting stored value');
                    }
                }
                throw err;
            })
                .then(async (value) => {
                // The value should be stored even is the signal was aborted.
                await this.setStored(key, value);
                return { isFresh: true, value };
            });
        })
            .finally(() => {
            this.pending.delete(key);
        });
        if (this.pending.has(key)) {
            // This should never happen. Indeed, there must not be any 'await'
            // statement between this and the loop iteration check meaning that
            // this.pending.get returned undefined. It is there to catch bugs that
            // would occur in future changes to the code.
            throw new Error('Concurrent request for the same key');
        }
        this.pending.set(key, currentExecutionFlow);
        const { value } = await currentExecutionFlow;
        return value;
    }
    async getStored(key, options) {
        try {
            return await this.store.get(key, options);
        }
        catch (err) {
            return undefined;
        }
    }
    async setStored(key, value) {
        try {
            await this.store.set(key, value);
        }
        catch (err) {
            const onStoreError = this.options?.onStoreError;
            await onStoreError?.(err, key, value);
        }
    }
    async delStored(key, _cause) {
        await this.store.del(key);
    }
}
exports.CachedGetter = CachedGetter;
//# sourceMappingURL=cached-getter.js.map