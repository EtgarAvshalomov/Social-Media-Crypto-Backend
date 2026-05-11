"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateUseUriSchema = exports.webUriSchema = exports.httpsUriSchema = exports.loopbackUriSchema = exports.dangerousUriSchema = void 0;
const zod_1 = require("zod");
const util_js_1 = require("./util.js");
/**
 * Valid, but potentially dangerous URL (`data:`, `file:`, `javascript:`, etc.).
 *
 * Any value that matches this schema is safe to parse using `new URL()`.
 */
exports.dangerousUriSchema = zod_1.z
    .string()
    .refine((data) => data.includes(':') && (0, util_js_1.canParseUrl)(data), {
    message: 'Invalid URL',
});
exports.loopbackUriSchema = exports.dangerousUriSchema.superRefine((value, ctx) => {
    // Loopback url must use the "http:" protocol
    if (!value.startsWith('http://')) {
        ctx.addIssue({
            code: zod_1.ZodIssueCode.custom,
            message: 'URL must use the "http:" protocol',
        });
        return false;
    }
    const url = new URL(value);
    if (!(0, util_js_1.isLoopbackHost)(url.hostname)) {
        ctx.addIssue({
            code: zod_1.ZodIssueCode.custom,
            message: 'URL must use "localhost", "127.0.0.1" or "[::1]" as hostname',
        });
        return false;
    }
    return true;
});
exports.httpsUriSchema = exports.dangerousUriSchema.superRefine((value, ctx) => {
    if (!value.startsWith('https://')) {
        ctx.addIssue({
            code: zod_1.ZodIssueCode.custom,
            message: 'URL must use the "https:" protocol',
        });
        return false;
    }
    const url = new URL(value);
    // Disallow loopback URLs with the `https:` protocol
    if ((0, util_js_1.isLoopbackHost)(url.hostname)) {
        ctx.addIssue({
            code: zod_1.ZodIssueCode.custom,
            message: 'https: URL must not use a loopback host',
        });
        return false;
    }
    if ((0, util_js_1.isHostnameIP)(url.hostname)) {
        // Hostname is an IP address
    }
    else {
        // Hostname is a domain name
        if (!url.hostname.includes('.')) {
            // we don't depend on PSL here, so we only check for a dot
            ctx.addIssue({
                code: zod_1.ZodIssueCode.custom,
                message: 'Domain name must contain at least two segments',
            });
            return false;
        }
        if (url.hostname.endsWith('.local')) {
            ctx.addIssue({
                code: zod_1.ZodIssueCode.custom,
                message: 'Domain name must not end with ".local"',
            });
            return false;
        }
    }
    return true;
});
exports.webUriSchema = zod_1.z
    .string()
    .superRefine((value, ctx) => {
    // discriminated union of `loopbackUriSchema` and `httpsUriSchema`
    if (value.startsWith('http://')) {
        const result = exports.loopbackUriSchema.safeParse(value);
        if (!result.success)
            result.error.issues.forEach(ctx.addIssue, ctx);
        return result.success;
    }
    if (value.startsWith('https://')) {
        const result = exports.httpsUriSchema.safeParse(value);
        if (!result.success)
            result.error.issues.forEach(ctx.addIssue, ctx);
        return result.success;
    }
    ctx.addIssue({
        code: zod_1.ZodIssueCode.custom,
        message: 'URL must use the "http:" or "https:" protocol',
    });
    return false;
});
exports.privateUseUriSchema = exports.dangerousUriSchema.superRefine((value, ctx) => {
    const dotIdx = value.indexOf('.');
    const colonIdx = value.indexOf(':');
    // Optimization: avoid parsing the URL if the protocol does not contain a "."
    if (dotIdx === -1 || colonIdx === -1 || dotIdx > colonIdx) {
        ctx.addIssue({
            code: zod_1.ZodIssueCode.custom,
            message: 'Private-use URI scheme requires a "." as part of the protocol',
        });
        return false;
    }
    const url = new URL(value);
    // Should be covered by the check before, but let's be extra sure
    if (!url.protocol.includes('.')) {
        ctx.addIssue({
            code: zod_1.ZodIssueCode.custom,
            message: 'Invalid private-use URI scheme',
        });
        return false;
    }
    // https://datatracker.ietf.org/doc/html/rfc8252#section-7.1
    //
    // > When choosing a URI scheme to associate with the app, apps MUST use a
    // > URI scheme based on a domain name under their control, expressed in
    // > reverse order
    //
    // https://datatracker.ietf.org/doc/html/rfc8252#section-8.4
    //
    // > In addition to the collision-resistant properties, requiring a URI
    // > scheme based on a domain name that is under the control of the app can
    // > help to prove ownership in the event of a dispute where two apps claim
    // > the same private-use URI scheme (where one app is acting maliciously).
    //
    // We can't check for ownership here (as there is no concept of proven
    // ownership in a generic validation logic), besides excluding local domains
    // as they can't be controlled/owned by the app.
    //
    // https://atproto.com/specs/oauth
    //
    // > Any custom scheme must match the `client_id` hostname in reverse-domain
    // > order.
    //
    // This ATPROTO specific requirement cannot be enforced here, (as there is
    // no concept of `client_id` in this context).
    const uriScheme = url.protocol.slice(0, -1); // remove trailing ":"
    const urlDomain = uriScheme.split('.').reverse().join('.');
    if ((0, util_js_1.isLocalHostname)(urlDomain)) {
        ctx.addIssue({
            code: zod_1.ZodIssueCode.custom,
            message: `Private-use URI Scheme redirect URI must not be a local hostname`,
        });
    }
    // https://datatracker.ietf.org/doc/html/rfc8252#section-7.1
    //
    // > Following the requirements of Section 3.2 of [RFC3986], as there is no
    // > naming authority for private-use URI scheme redirects, only a single
    // > slash ("/") appears after the scheme component.
    if (url.href.startsWith(`${url.protocol}//`) ||
        url.username ||
        url.password ||
        url.hostname ||
        url.port) {
        ctx.addIssue({
            code: zod_1.ZodIssueCode.custom,
            message: 'Private-Use URI Scheme must be in the form <scheme>:/{path} (notice the single slash!) as per RFC 8252',
        });
        return false;
    }
    return true;
});
//# sourceMappingURL=uri.js.map