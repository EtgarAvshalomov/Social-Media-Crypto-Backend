"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.didDocumentValidator = exports.didDocumentSchema = void 0;
const zod_1 = require("zod");
const did_js_1 = require("./did.js");
const uri_js_1 = require("./lib/uri.js");
/**
 * RFC3968 compliant URI
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc3986}
 */
const rfc3968UriSchema = zod_1.z.string().url('RFC3968 compliant URI');
const didControllerSchema = zod_1.z.union([did_js_1.didSchema, zod_1.z.array(did_js_1.didSchema)]);
/**
 * @note this schema is too permissive
 */
const didRelativeUriSchema = zod_1.z.union([
    rfc3968UriSchema.refine((value) => {
        const fragmentIndex = value.indexOf('#');
        if (fragmentIndex === -1)
            return false;
        return (0, uri_js_1.isFragment)(value, fragmentIndex + 1);
    }, {
        message: 'Missing or invalid fragment in RFC3968 URI',
    }),
    zod_1.z
        .string()
        .refine((value) => value.charCodeAt(0) === 35 /* # */, {
        message: 'Fragment must start with #',
    })
        .refine((value) => (0, uri_js_1.isFragment)(value, 1), {
        message: 'Invalid char in URI fragment',
    }),
]);
/**
 * @see {@link https://www.w3.org/TR/did-1.0/#verification-material Verification Material}
 */
const didVerificationMethodSchema = zod_1.z.object({
    id: didRelativeUriSchema,
    type: zod_1.z.string().min(1),
    controller: didControllerSchema,
    publicKeyJwk: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
    publicKeyMultibase: zod_1.z.string().optional(),
});
/**
 * The value of the id property MUST be a URI conforming to [RFC3986]. A
 * conforming producer MUST NOT produce multiple service entries with the same
 * id. A conforming consumer MUST produce an error if it detects multiple
 * service entries with the same id.
 *
 * @note Normally, only rfc3968UriSchema should be allowed here. However, the
 *   did:plc uses relative URI. For this reason, we also allow relative URIs
 *   here.
 */
const didServiceIdSchema = didRelativeUriSchema;
/**
 * The value of the type property MUST be a string or a set of strings. In order
 * to maximize interoperability, the service type and its associated properties
 * SHOULD be registered in the DID Specification Registries
 * [DID-SPEC-REGISTRIES].
 */
const didServiceTypeSchema = zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]);
/**
 * The value of the serviceEndpoint property MUST be a string, a map, or a set
 * composed of one or more strings and/or maps. All string values MUST be valid
 * URIs conforming to [RFC3986] and normalized according to the Normalization
 * and Comparison rules in RFC3986 and to any normalization rules in its
 * applicable URI scheme specification.
 */
const didServiceEndpointSchema = zod_1.z.union([
    rfc3968UriSchema,
    zod_1.z.record(zod_1.z.string(), rfc3968UriSchema),
    zod_1.z
        .array(zod_1.z.union([rfc3968UriSchema, zod_1.z.record(zod_1.z.string(), rfc3968UriSchema)]))
        .nonempty(),
]);
/**
 * Each service map MUST contain id, type, and serviceEndpoint properties.
 * @see {@link https://www.w3.org/TR/did-core/#services}
 */
const didServiceSchema = zod_1.z.object({
    id: didServiceIdSchema,
    type: didServiceTypeSchema,
    serviceEndpoint: didServiceEndpointSchema,
});
/**
 * @see {@link https://www.w3.org/TR/did-1.0/#referring-to-verification-methods Referring to Verification Methods}
 */
const verificationMethodReference = zod_1.z.union([
    //
    didRelativeUriSchema,
    didVerificationMethodSchema,
]);
/**
 * @note This schema is incomplete
 * @see {@link https://www.w3.org/TR/did-core/#production-0}
 */
exports.didDocumentSchema = zod_1.z.object({
    '@context': zod_1.z
        .union([
        zod_1.z.literal('https://www.w3.org/ns/did/v1'),
        zod_1.z
            .array(zod_1.z.string().url())
            .nonempty()
            .refine((data) => data[0] === 'https://www.w3.org/ns/did/v1', {
            message: 'First @context must be https://www.w3.org/ns/did/v1',
        }),
    ])
        // @NOTE @context is required by producers, but optional for consumers.
        .optional(),
    id: did_js_1.didSchema,
    controller: didControllerSchema.optional(),
    alsoKnownAs: zod_1.z.array(rfc3968UriSchema).optional(),
    service: zod_1.z.array(didServiceSchema).optional(),
    authentication: zod_1.z.array(verificationMethodReference).optional(),
    verificationMethod: zod_1.z.array(didVerificationMethodSchema).optional(),
});
// @TODO: add other refinements ?
exports.didDocumentValidator = exports.didDocumentSchema
    // Ensure that every service id is unique
    .superRefine(({ id: did, service }, ctx) => {
    if (service) {
        const visited = new Set();
        for (let i = 0; i < service.length; i++) {
            const current = service[i];
            const serviceId = current.id.startsWith('#')
                ? `${did}${current.id}`
                : current.id;
            if (!visited.has(serviceId)) {
                visited.add(serviceId);
            }
            else {
                ctx.addIssue({
                    code: zod_1.z.ZodIssueCode.custom,
                    message: `Duplicate service id (${current.id}) found in the document`,
                    path: ['service', i, 'id'],
                });
            }
        }
    }
});
//# sourceMappingURL=did-document.js.map