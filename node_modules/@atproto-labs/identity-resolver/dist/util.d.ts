import { AtprotoIdentityDidMethods, DidDocument } from '@atproto-labs/did-resolver';
/**
 * Extract the raw, un-validated, Atproto handle from a DID document.
 */
export declare function extractAtprotoHandle(document: DidDocument<AtprotoIdentityDidMethods>): string | undefined;
/**
 * Extracts a validated, normalized Atproto handle from a DID document.
 */
export declare function extractNormalizedHandle(document: DidDocument<AtprotoIdentityDidMethods>): string | undefined;
export declare function asNormalizedHandle(input: string): string | undefined;
export declare function normalizeHandle(handle: string): string;
export declare function isValidHandle(handle: string): boolean;
//# sourceMappingURL=util.d.ts.map