import {z} from "zod";
import {EmailString, RequiredString} from "@/common/schema/helpers/ZodStringHelpers.ts";

export const UserRegisterSchema = z.object({
    name: RequiredString
        .min(3, "Name must be at least 3 characters.")
        .max(255, "Name must not be more than 255 characters."),

    email: EmailString
        .max(255, "Email must not be more than 255 characters."),

    password: RequiredString
        .min(16, "Password must be at least 16 characters.")
        .max(255, "Password must not be more than 255 characters."),

    confirm: RequiredString
        .min(16, "Confirm must be at least 16 characters.")
        .max(255, "Confirm must not be more than 255 characters."),
}).superRefine((values, ctx) => {
    const {password, confirm} = values;

    if (password !== confirm) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords don't match.",
            path: ["confirm"],
        });
    }
});

export type UserRegisterData = z.infer<typeof UserRegisterSchema>;