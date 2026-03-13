import {z, ZodType} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {EmailStringSchema} from "@/common/schema/strings/EmailStringSchema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";

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
    isAdmin: CoercedBooleanValueSchema,
});

export type AuthUserDetails = z.infer<typeof AuthUserDetailsSchema>