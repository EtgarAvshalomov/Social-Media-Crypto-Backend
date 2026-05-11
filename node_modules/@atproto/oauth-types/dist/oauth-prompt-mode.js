"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthPromptModeSchema = void 0;
const zod_1 = require("zod");
/**
 * - "none" will only be allowed if the user already allowed the client on the same device
 * - "login" will force the user to login again, unless he very recently logged in
 * - "consent" will force the user to consent again
 * - "select_account" will force the user to select an account
 * - "create" will force the user registration screen
 */
exports.oauthPromptModeSchema = zod_1.z.enum([
    'none',
    'login',
    'consent',
    'select_account',
    'create',
]);
//# sourceMappingURL=oauth-prompt-mode.js.map