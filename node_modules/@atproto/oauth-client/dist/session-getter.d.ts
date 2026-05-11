import { AtprotoDid } from '@atproto/did';
import { Key } from '@atproto/jwk';
import { CachedGetter, GetCachedOptions, GetOptions, SimpleStore } from '@atproto-labs/simple-store';
import { AuthMethodUnsatisfiableError } from './errors/auth-method-unsatisfiable-error.js';
import { TokenInvalidError } from './errors/token-invalid-error.js';
import { TokenRefreshError } from './errors/token-refresh-error.js';
import { TokenRevokedError } from './errors/token-revoked-error.js';
import { ClientAuthMethod } from './oauth-client-auth.js';
import { TokenSet } from './oauth-server-agent.js';
import { OAuthServerFactory } from './oauth-server-factory.js';
import { Runtime } from './runtime.js';
export type Session = {
    dpopKey: Key;
    authMethod: ClientAuthMethod;
    tokenSet: TokenSet;
};
export type SessionStore = SimpleStore<string, Session>;
export type SessionHooks = {
    onUpdate?: (sub: AtprotoDid, session: Session) => void;
    onDelete?: (sub: AtprotoDid, cause: TokenRefreshError | TokenRevokedError | TokenInvalidError | unknown) => void;
};
export declare function isExpectedSessionError(err: unknown): err is TypeError | AuthMethodUnsatisfiableError | TokenRevokedError | TokenRefreshError | TokenInvalidError;
/**
 * There are several advantages to wrapping the sessionStore in a (single)
 * CachedGetter, the main of which is that the cached getter will ensure that at
 * most one fresh call is ever being made. Another advantage, is that it
 * contains the logic for reading from the cache which, if the cache is based on
 * localStorage/indexedDB, will sync across multiple tabs (for a given sub).
 */
export declare class SessionGetter extends CachedGetter<AtprotoDid, Session> {
    private readonly runtime;
    private readonly hooks;
    constructor(sessionStore: SessionStore, serverFactory: OAuthServerFactory, runtime: Runtime, hooks?: SessionHooks);
    getStored(sub: AtprotoDid, options?: GetOptions): Promise<Session | undefined>;
    setStored(sub: AtprotoDid, session: Session): Promise<void>;
    delStored(sub: AtprotoDid, cause?: unknown): Promise<void>;
    /**
     * @deprecated Use {@link getSession} instead
     * @internal (not really deprecated)
     */
    get(sub: AtprotoDid, options?: GetCachedOptions): Promise<Session>;
    /**
     * @param refresh When `true`, the credentials will be refreshed even if they
     * are not expired. When `false`, the credentials will not be refreshed even
     * if they are expired. When `undefined`, the credentials will be refreshed
     * if, and only if, they are (about to be) expired. Defaults to `undefined`.
     */
    getSession(sub: AtprotoDid, refresh?: boolean | 'auto'): Promise<Session>;
}
//# sourceMappingURL=session-getter.d.ts.map