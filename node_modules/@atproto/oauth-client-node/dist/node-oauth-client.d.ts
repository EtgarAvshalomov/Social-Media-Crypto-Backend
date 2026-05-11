import { HandleResolver, OAuthClient, OAuthClientFetchMetadataOptions, OAuthClientOptions, RuntimeImplementation, RuntimeLock } from '@atproto/oauth-client';
import { OAuthResponseMode } from '@atproto/oauth-types';
import { AtprotoHandleResolverNodeOptions } from '@atproto-labs/handle-resolver-node';
import { NodeSavedSessionStore, NodeSavedStateStore } from './node-dpop-store.js';
import { Override } from './util.js';
export type * from './node-dpop-store.js';
export type { OAuthClientOptions, OAuthResponseMode, RuntimeLock };
export type NodeOAuthClientOptions = Override<OAuthClientOptions, {
    responseMode?: Exclude<OAuthResponseMode, 'fragment'>;
    stateStore: NodeSavedStateStore;
    sessionStore: NodeSavedSessionStore;
    /**
     * Used to build a {@link NodeOAuthClientOptions.handleResolver} if none is
     * provided.
     */
    fallbackNameservers?: AtprotoHandleResolverNodeOptions['fallbackNameservers'];
    handleResolver?: HandleResolver | string | URL;
    /**
     * Used to build a {@link NodeOAuthClientOptions.runtimeImplementation} if
     * none is provided. Pass in `requestLocalLock` from `@atproto/oauth-client`
     * to mute warning.
     */
    requestLock?: RuntimeLock;
    runtimeImplementation?: RuntimeImplementation;
}>;
export type NodeOAuthClientFromMetadataOptions = OAuthClientFetchMetadataOptions & Omit<NodeOAuthClientOptions, 'clientMetadata'>;
export declare class NodeOAuthClient extends OAuthClient {
    constructor({ requestLock, fallbackNameservers, fetch, responseMode, stateStore, sessionStore, handleResolver, runtimeImplementation, ...options }: NodeOAuthClientOptions);
}
//# sourceMappingURL=node-oauth-client.d.ts.map