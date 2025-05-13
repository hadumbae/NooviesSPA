import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {EmailStringSchema} from "@/common/schema/strings/EmailStringSchema.ts";

export const UserLoginSchema = z.object({
    email: EmailStringSchema
        .max(255, "Email must not be more than 255 characters."),

    password: NonEmptyStringSchema
        .min(16, "Password must be at least 16 characters.")
        .max(255, "Password must not be more than 255 characters."),
});

export type UserLoginData = z.infer<typeof UserLoginSchema>;