export declare const canParseUrl: (url: string | URL, base?: string | URL) => boolean;
export declare function isHostnameIP(hostname: string): boolean;
export type LoopbackHost = 'localhost' | '127.0.0.1' | '[::1]';
export declare function isLoopbackHost(host: unknown): host is LoopbackHost;
export declare function isLocalHostname(hostname: string): boolean;
export declare function safeUrl(input: URL | string): URL | null;
export declare function extractUrlPath(url: any): any;
export declare const jsonObjectPreprocess: (val: unknown) => any;
export declare const numberPreprocess: (val: unknown) => unknown;
/**
 * Returns true if the two arrays contain the same elements, regardless of order
 * or duplicates.
 */
export declare function arrayEquivalent<T>(a: readonly T[], b: readonly T[]): boolean;
export declare function includedIn<T>(this: readonly T[], item: T): boolean;
export declare function asArray<T>(value: Iterable<T> | undefined): undefined | readonly T[];
export type SpaceSeparatedValue<Value extends string> = `${'' | `${string} `}${Value}${'' | ` ${string}`}`;
export declare const isSpaceSeparatedValue: <Value extends string>(value: Value, input: string) => input is SpaceSeparatedValue<Value>;
//# sourceMappingURL=util.d.ts.map