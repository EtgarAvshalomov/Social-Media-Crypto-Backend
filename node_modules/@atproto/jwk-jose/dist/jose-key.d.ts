import { type GenerateKeyPairOptions, type GenerateKeyPairResult, type KeyLike } from 'jose';
import { Jwk, JwtHeader, JwtPayload, Key, SignedJwt, VerifyOptions, VerifyResult } from '@atproto/jwk';
export { type GenerateKeyPairOptions, type GenerateKeyPairResult, type Jwk, type JwtHeader, type JwtPayload, type KeyLike, type SignedJwt, type VerifyOptions, };
export declare class JoseKey<J extends Jwk = Jwk> extends Key<J> {
    /**
     * Some runtimes (e.g. Bun) require an `alg` second argument to be set when
     * invoking `importJWK`. In order to be compatible with these runtimes, we
     * provide the following method to ensure the `alg` is always set. We also
     * take the opportunity to ensure that the `alg` is compatible with this key.
     */
    protected getKeyObj(alg: string): Promise<KeyLike | Uint8Array<ArrayBufferLike>>;
    createJwt(header: JwtHeader, payload: JwtPayload): Promise<SignedJwt>;
    verifyJwt<C extends string = never>(token: SignedJwt, options?: VerifyOptions<C>): Promise<VerifyResult<C>>;
    static generateKeyPair(allowedAlgos?: readonly string[], options?: GenerateKeyPairOptions): Promise<GenerateKeyPairResult<KeyLike>>;
    static generate(allowedAlgos?: string[], kid?: string, options?: Omit<GenerateKeyPairOptions, 'extractable'>): Promise<JoseKey>;
    static fromImportable(input: string | KeyLike | Jwk, kid?: string): Promise<JoseKey>;
    /**
     * @see {@link exportJWK}
     */
    static fromKeyLike(keyLike: KeyLike | Uint8Array, kid?: string, alg?: string): Promise<JoseKey>;
    /**
     * @see {@link importPKCS8}
     */
    static fromPKCS8(pem: string, alg: string, kid?: string): Promise<JoseKey>;
    static fromJWK(input: string | Record<string, unknown>, inputKid?: string): Promise<JoseKey>;
}
//# sourceMappingURL=jose-key.d.ts.map