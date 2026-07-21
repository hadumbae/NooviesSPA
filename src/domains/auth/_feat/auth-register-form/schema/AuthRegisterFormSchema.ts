/**
 * @fileoverview Zod schemas and types for the user registration form.
 *
 */
import {z} from "zod";
import {AnyValues} from "@/common/_types";
import {
    UserEmailSchema,
    UserPasswordSchema,
    UserPersonalNameSchema
} from "@/domains/auth/_feat/auth-register-form/schema/fields";
import {preprocessEmptyToUndefined} from "@/common/_feat/validation-preprocessors";

/** Base schema for registration input fields. */
export const AuthRegisterFormBaseSchema = z.object({
    name: preprocessEmptyToUndefined(UserPersonalNameSchema),
    email: preprocessEmptyToUndefined(UserEmailSchema),
    password: preprocessEmptyToUndefined(UserPasswordSchema),
    confirm: preprocessEmptyToUndefined(UserPasswordSchema),
});

/** Registration schema with cross-field validation for password confirmation. */
export const AuthRegisterFormSchema = AuthRegisterFormBaseSchema.superRefine((values, ctx) => {
    if (values.password !== values.confirm) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords don't match.",
            path: ["confirm"],
        });
    }
});

/** Type inferred from the registration form schema. */
export type AuthRegisterForm = z.infer<typeof AuthRegisterFormSchema>;

/** Form-compatible values for the registration schema. */
export type AuthRegisterFormValues = AnyValues<AuthRegisterForm>;