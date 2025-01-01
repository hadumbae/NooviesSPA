import {z} from "zod";
import {EmailString, RequiredString} from "@/common/schema/helpers/ZodStringHelpers.ts";

export const UserLoginSchema = z.object({
    email: EmailString
        .max(255, "Email must not be more than 255 characters."),

    password: RequiredString
        .min(16, "Password must be at least 16 characters.")
        .max(255, "Password must not be more than 255 characters."),
});

export type UserLoginData = z.infer<typeof UserLoginSchema>;