import {z, ZodType} from "zod";
import {EmailString, IDString, RequiredString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";

interface IAuthUserDetailsSchema {
    user: string,
    name: string,
    email: string,
    isAdmin: boolean,
}

export const AuthUserDetailsSchema: ZodType<IAuthUserDetailsSchema> = z.object({
    user: IDString,
    name: RequiredString,
    email: EmailString,
    isAdmin: RequiredBoolean,
});

export type AuthUserDetails = z.infer<typeof AuthUserDetailsSchema>