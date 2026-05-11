import { Jwk, Key } from '@atproto/jwk';
import { InternalStateData, Session } from '@atproto/oauth-client';
import { SimpleStore } from '@atproto-labs/simple-store';
type ToDpopJwkValue<V extends {
    dpopKey: Key;
}> = Omit<V, 'dpopKey'> & {
    dpopJwk: Jwk;
};
/**
 * Utility function that allows to simplify the store interface by exposing a
 * JWK (JSON) instead of a Key instance.
 */
export declare function toDpopKeyStore<K extends string, V extends {
    dpopKey: Key;
    dpopJwk?: never;
}>(store: SimpleStore<K, ToDpopJwkValue<V>>): SimpleStore<K, V>;
export type NodeSavedState = ToDpopJwkValue<InternalStateData>;
export type NodeSavedStateStore = SimpleStore<string, NodeSavedState>;
export type NodeSavedSession = ToDpopJwkValue<Session>;
export type NodeSavedSessionStore = SimpleStore<string, NodeSavedSession>;
export {};
//# sourceMappingURL=node-dpop-store.d.ts.map