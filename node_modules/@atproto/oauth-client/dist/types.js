"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientMetadataSchema = void 0;
const zod_1 = require("zod");
const oauth_types_1 = require("@atproto/oauth-types");
exports.clientMetadataSchema = oauth_types_1.oauthClientMetadataSchema.extend({
    client_id: zod_1.z.union([
        oauth_types_1.oauthClientIdDiscoverableSchema,
        oauth_types_1.oauthClientIdLoopbackSchema,
    ]),
});
//# sourceMappingURL=types.js.map