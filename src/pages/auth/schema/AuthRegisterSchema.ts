import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {EmailStringSchema} from "@/common/schema/strings/EmailStringSchema.ts";

export const UserRegisterSchema = z.object({
    name: NonEmptyStringSchema
        .min(3, "Name must be at least 3 characters.")
        .max(255, "Name must not be more than 255 characters."),

    email: EmailStringSchema
        .max(255, "Email must not be more than 255 characters."),

    password: NonEmptyStringSchema
        .min(16, "Password must be at least 16 characters.")
        .max(255, "Password must not be more than 255 characters."),

    confirm: NonEmptyStringSchema
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