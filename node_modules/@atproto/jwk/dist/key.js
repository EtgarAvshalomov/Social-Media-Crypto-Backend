"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Key = void 0;
const alg_js_1 = require("./alg.js");
const jwk_js_1 = require("./jwk.js");
const util_js_1 = require("./util.js");
let Key = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _get_isPrivate_decorators;
    let _get_isSymetric_decorators;
    let _get_publicJwk_decorators;
    let _get_bareJwk_decorators;
    let _get_algorithms_decorators;
    return _a = class Key {
            constructor(jwk) {
                Object.defineProperty(this, "jwk", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _instanceExtraInitializers), jwk)
                });
            }
            get isPrivate() {
                return (0, jwk_js_1.isPrivateJwk)(this.jwk);
            }
            get isSymetric() {
                return (0, jwk_js_1.hasSharedSecretJwk)(this.jwk);
            }
            get privateJwk() {
                if (!this.isPrivate)
                    return undefined;
                return this.jwk;
            }
            get publicJwk() {
                if (this.isSymetric)
                    return undefined;
                if (!this.isPrivate)
                    return this.jwk;
                const validated = jwk_js_1.jwkPubSchema.safeParse({
                    ...this.jwk,
                    d: undefined,
                    k: undefined,
                    use: undefined,
                    key_ops: buildPublicKeyOps(this.keyOps) ?? jwk_js_1.PUBLIC_KEY_USAGE,
                });
                // One reason why the parsing might fail is if key_ops is empty. This check
                // also allows to future proof the code (e.g if another type of private key
                // is added that uses a different property than "d" or "k" to store its
                // private value).
                if (!validated.success)
                    return undefined;
                return Object.freeze(validated.data);
            }
            get bareJwk() {
                if (this.isSymetric)
                    return undefined;
                const { kty, crv, e, n, x, y } = this.jwk;
                return Object.freeze(jwk_js_1.jwkSchema.parse({ crv, e, kty, n, x, y }));
            }
            /**
             * @note Only defined on public keys
             */
            get use() {
                return this.jwk.use;
            }
            get keyOps() {
                return this.jwk.key_ops;
            }
            /**
             * The (forced) algorithm to use. If not provided, the key will be usable with
             * any of the algorithms in {@link algorithms}.
             *
             * @see {@link https://datatracker.ietf.org/doc/html/rfc7518#section-3.1 | "alg" (Algorithm) Header Parameter Values for JWS}
             */
            get alg() {
                return this.jwk.alg;
            }
            get kid() {
                return this.jwk.kid;
            }
            get crv() {
                return this.jwk.crv;
            }
            /**
             * All the algorithms that this key can be used with. If `alg` is provided,
             * this set will only contain that algorithm.
             */
            get algorithms() {
                return Object.freeze(Array.from((0, alg_js_1.jwkAlgorithms)(this.jwk)));
            }
            get isRevoked() {
                return this.jwk.revoked != null;
            }
            isActive(options) {
                if (!options?.allowRevoked && this.isRevoked)
                    return false;
                const tolerance = options?.clockTolerance ?? 0;
                if (tolerance !== Infinity) {
                    const now = options?.currentDate?.getTime() ?? Date.now();
                    const { exp, nbf } = this.jwk;
                    if (nbf != null && !(now >= nbf * 1e3 - tolerance))
                        return false;
                    if (exp != null && !(now < exp * 1e3 + tolerance))
                        return false;
                }
                return true;
            }
            matches(opts) {
                if (opts.kid != null) {
                    const matchesKid = Array.isArray(opts.kid)
                        ? this.kid != null && opts.kid.includes(this.kid)
                        : this.kid === opts.kid;
                    if (!matchesKid)
                        return false;
                }
                if (opts.alg != null) {
                    const matchesAlg = Array.isArray(opts.alg)
                        ? opts.alg.some((a) => this.algorithms.includes(a))
                        : this.algorithms.includes(opts.alg);
                    if (!matchesAlg)
                        return false;
                }
                if (opts.usage != null) {
                    const matchesOps = this.keyOps == null ||
                        this.keyOps.includes(opts.usage) ||
                        // @NOTE Because this.jwk represents the private key (typically used for
                        // private operations), the public counterpart operations are allowed.
                        (opts.usage === 'verify' && this.keyOps.includes('sign')) ||
                        (opts.usage === 'encrypt' && this.keyOps.includes('decrypt')) ||
                        (opts.usage === 'wrapKey' && this.keyOps.includes('unwrapKey'));
                    if (!matchesOps)
                        return false;
                    const matchesUse = this.use == null ||
                        (this.use === 'sig' && (0, jwk_js_1.isSigKeyUsage)(opts.usage)) ||
                        (this.use === 'enc' && (0, jwk_js_1.isEncKeyUsage)(opts.usage));
                    if (!matchesUse)
                        return false;
                    // @NOTE This is only relevant when "key_ops" and "use" are undefined.
                    // This line also ensures that when "opts.usage" is a private key usage
                    // (e.g. "sign"), the key is indeed a private key.
                    const matchesKeyType = this.isPrivate || (0, jwk_js_1.isPublicKeyUsage)(opts.usage);
                    if (!matchesKeyType)
                        return false;
                }
                return true;
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _get_isPrivate_decorators = [util_js_1.cachedGetter];
            _get_isSymetric_decorators = [util_js_1.cachedGetter];
            _get_publicJwk_decorators = [util_js_1.cachedGetter];
            _get_bareJwk_decorators = [util_js_1.cachedGetter];
            _get_algorithms_decorators = [util_js_1.cachedGetter];
            __esDecorate(_a, null, _get_isPrivate_decorators, { kind: "getter", name: "isPrivate", static: false, private: false, access: { has: obj => "isPrivate" in obj, get: obj => obj.isPrivate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_isSymetric_decorators, { kind: "getter", name: "isSymetric", static: false, private: false, access: { has: obj => "isSymetric" in obj, get: obj => obj.isSymetric }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_publicJwk_decorators, { kind: "getter", name: "publicJwk", static: false, private: false, access: { has: obj => "publicJwk" in obj, get: obj => obj.publicJwk }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_bareJwk_decorators, { kind: "getter", name: "bareJwk", static: false, private: false, access: { has: obj => "bareJwk" in obj, get: obj => obj.bareJwk }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_algorithms_decorators, { kind: "getter", name: "algorithms", static: false, private: false, access: { has: obj => "algorithms" in obj, get: obj => obj.algorithms }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.Key = Key;
function buildPublicKeyOps(keyUsages) {
    if (keyUsages == null)
        return undefined;
    // https://datatracker.ietf.org/doc/html/rfc7517#section-4.3
    // > Duplicate key operation values MUST NOT be present in the array.
    const publicOps = new Set(keyUsages.filter(jwk_js_1.isPublicKeyUsage));
    // @NOTE Translating private key usage into public key usage
    if (keyUsages.includes('sign'))
        publicOps.add('verify');
    if (keyUsages.includes('decrypt'))
        publicOps.add('encrypt');
    if (keyUsages.includes('unwrapKey'))
        publicOps.add('wrapKey');
    return Array.from(publicOps);
}
//# sourceMappingURL=key.js.map