"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ifString = void 0;
exports.contentMime = contentMime;
exports.combineSignals = combineSignals;
const ifString = (v) => (typeof v === 'string' ? v : undefined);
exports.ifString = ifString;
function contentMime(headers) {
    return headers.get('content-type')?.split(';')[0].trim();
}
function combineSignals(signals) {
    const controller = new DisposableAbortController();
    const onAbort = function (_event) {
        const reason = new Error('This operation was aborted', {
            cause: this.reason,
        });
        controller.abort(reason);
    };
    try {
        for (const sig of signals) {
            if (sig) {
                sig.throwIfAborted();
                sig.addEventListener('abort', onAbort, { signal: controller.signal });
            }
        }
        return controller;
    }
    catch (err) {
        controller.abort(err);
        throw err;
    }
}
/**
 * Allows using {@link AbortController} with the `using` keyword, in order to
 * automatically abort them once the execution block ends.
 */
class DisposableAbortController extends AbortController {
    [Symbol.dispose]() {
        this.abort(new Error('AbortController was disposed'));
    }
}
//# sourceMappingURL=util.js.map