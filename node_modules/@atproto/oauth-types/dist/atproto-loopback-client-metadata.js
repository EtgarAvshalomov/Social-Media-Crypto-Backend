"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atprotoLoopbackClientMetadata = atprotoLoopbackClientMetadata;
exports.buildAtprotoLoopbackClientMetadata = buildAtprotoLoopbackClientMetadata;
const atproto_loopback_client_id_js_1 = require("./atproto-loopback-client-id.js");
function atprotoLoopbackClientMetadata(clientId) {
    const params = (0, atproto_loopback_client_id_js_1.parseAtprotoLoopbackClientId)(clientId);
    // Safe to cast because parseAtprotoLoopbackClientId ensures it's a loopback ID
    return buildMetadataInternal(clientId, params);
}
function buildAtprotoLoopbackClientMetadata(config) {
    const clientId = (0, atproto_loopback_client_id_js_1.buildAtprotoLoopbackClientId)(config);
    return buildMetadataInternal(clientId, (0, atproto_loopback_client_id_js_1.parseAtprotoLoopbackClientId)(clientId));
}
function buildMetadataInternal(clientId, clientParams) {
    return {
        client_id: clientId,
        scope: clientParams.scope,
        redirect_uris: clientParams.redirect_uris,
        response_types: ['code'],
        grant_types: ['authorization_code', 'refresh_token'],
        token_endpoint_auth_method: 'none',
        application_type: 'native',
        dpop_bound_access_tokens: true,
    };
}
//# sourceMappingURL=atproto-loopback-client-metadata.js.map