import { z } from 'zod';
export declare const oidcUserinfoSchema: z.ZodObject<{
    sub: z.ZodString;
    iss: z.ZodOptional<z.ZodString>;
    aud: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    email: z.ZodOptional<z.ZodString>;
    email_verified: z.ZodOptional<z.ZodBoolean>;
    name: z.ZodOptional<z.ZodString>;
    preferred_username: z.ZodOptional<z.ZodString>;
    picture: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    sub: string;
    email?: string | undefined;
    name?: string | undefined;
    preferred_username?: string | undefined;
    picture?: string | undefined;
    email_verified?: boolean | undefined;
    iss?: string | undefined;
    aud?: string | string[] | undefined;
}, {
    sub: string;
    email?: string | undefined;
    name?: string | undefined;
    preferred_username?: string | undefined;
    picture?: string | undefined;
    email_verified?: boolean | undefined;
    iss?: string | undefined;
    aud?: string | string[] | undefined;
}>;
export type OidcUserinfo = z.infer<typeof oidcUserinfoSchema>;
//# sourceMappingURL=oidc-userinfo.d.ts.map