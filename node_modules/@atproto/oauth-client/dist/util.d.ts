export type Awaitable<T> = T | PromiseLike<T>;
export type Simplify<T> = {
    [K in keyof T]: T[K];
} & NonNullable<unknown>;
export declare const ifString: <V>(v: V) => (V & string) | undefined;
export declare function contentMime(headers: Headers): string | undefined;
export declare function combineSignals(signals: readonly (AbortSignal | undefined)[]): AbortController & Disposable;
//# sourceMappingURL=util.d.ts.map