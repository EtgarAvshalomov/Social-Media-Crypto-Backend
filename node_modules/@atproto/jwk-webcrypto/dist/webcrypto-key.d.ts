import { Jwk } from '@atproto/jwk';
import { GenerateKeyPairOptions, JoseKey } from '@atproto/jwk-jose';
export declare class WebcryptoKey<J extends Jwk = Jwk> extends JoseKey<J> {
    readonly cryptoKeyPair: CryptoKeyPair;
    static generate(allowedAlgos?: string[], kid?: string, options?: GenerateKeyPairOptions): Promise<WebcryptoKey>;
    static fromKeypair(cryptoKeyPair: CryptoKeyPair, kid?: string): Promise<WebcryptoKey>;
    constructor(jwk: Readonly<J>, cryptoKeyPair: CryptoKeyPair);
    get isPrivate(): boolean;
    protected getKeyObj(alg: string): Promise<CryptoKey>;
}
//# sourceMappingURL=webcrypto-key.d.ts.map