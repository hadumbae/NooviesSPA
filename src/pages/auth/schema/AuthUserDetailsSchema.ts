import {z, ZodType} from "zod";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {EmailStringSchema} from "@/common/schema/strings/EmailStringSchema.ts";

interface IAuthUserDetailsSchema {
    user: string,
    name: string,
    email: string,
    isAdmin: boolean,
}

export const AuthUserDetailsSchema: ZodType<IAuthUserDetailsSchema> = z.object({
    user: IDStringSchema,
    name: NonEmptyStringSchema,
    email: EmailStringSchema,
    isAdmin: RequiredBoolean,
});

export type AuthUserDetails = z.infer<typeof AuthUserDetailsSchema>