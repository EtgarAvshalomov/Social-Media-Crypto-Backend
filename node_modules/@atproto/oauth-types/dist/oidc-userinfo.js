"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oidcUserinfoSchema = void 0;
const zod_1 = require("zod");
exports.oidcUserinfoSchema = zod_1.z.object({
    sub: zod_1.z.string(),
    iss: zod_1.z.string().url().optional(),
    aud: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string()).min(1)]).optional(),
    email: zod_1.z.string().email().optional(),
    email_verified: zod_1.z.boolean().optional(),
    name: zod_1.z.string().optional(),
    preferred_username: zod_1.z.string().optional(),
    picture: zod_1.z.string().url().optional(),
});
//# sourceMappingURL=oidc-userinfo.js.map