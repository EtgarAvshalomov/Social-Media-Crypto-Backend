import { Jwk, KeyUsage, PrivateJwk, PublicJwk } from './jwk.js';
import { VerifyOptions, VerifyResult } from './jwt-verify.js';
import { JwtHeader, JwtPayload, SignedJwt } from './jwt.js';
export type KeyMatchOptions = {
    usage?: KeyUsage;
    kid?: string | string[];
    alg?: string | string[];
};
export type ActivityCheckOptions = {
    allowRevoked?: boolean;
    clockTolerance?: number;
    currentDate?: Date;
};
export declare abstract class Key<J extends Jwk = Jwk> {
    readonly jwk: Readonly<J>;
    constructor(jwk: Readonly<J>);
    get isPrivate(): boolean;
    get isSymetric(): boolean;
    get privateJwk(): Readonly<PrivateJwk> | undefined;
    get publicJwk(): Readonly<PublicJwk> | undefined;
    get bareJwk(): Readonly<Jwk> | undefined;
    /**
     * @note Only defined on public keys
     */
    get use(): 'sig' | 'enc' | undefined;
    get keyOps(): readonly KeyUsage[] | undefined;
    /**
     * The (forced) algorithm to use. If not provided, the key will be usable with
     * any of the algorithms in {@link algorithms}.
     *
     * @see {@link https://datatracker.ietf.org/doc/html/rfc7518#section-3.1 | "alg" (Algorithm) Header Parameter Values for JWS}
     */
    get alg(): J["alg"] | undefined;
    get kid(): J["kid"] | undefined;
    get crv(): "P-256" | "P-384" | "P-521" | "secp256k1" | "Ed25519" | "Ed448" | undefined;
    /**
     * All the algorithms that this key can be used with. If `alg` is provided,
     * this set will only contain that algorithm.
     */
    get algorithms(): readonly string[];
    get isRevoked(): boolean;
    isActive(options?: ActivityCheckOptions): boolean;
    matches(opts: KeyMatchOptions): boolean;
    /**
     * Create a signed JWT
     */
    abstract createJwt(header: JwtHeader, payload: JwtPayload): Promise<SignedJwt>;
    /**
     * Verify the signature, headers and payload of a JWT
     *
     * @throws {JwtVerifyError} if the JWT is invalid
     */
    abstract verifyJwt<C extends string = never>(token: SignedJwt, options?: VerifyOptions<C>): Promise<VerifyResult<C>>;
}
//# sourceMappingURL=key.d.ts.map