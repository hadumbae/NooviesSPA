/**
 * @fileoverview Zod schemas and types for the user registration form.
 *
 */
import {z} from "zod";
import {AnyValues} from "@/common/_types";
import {preprocessEmptyToUndefined} from "@/common/_feat/validation-preprocessors";
import {UserEmailSchema, UserPasswordSchema, UserPersonalNameSchema} from "@/domains/users/_schema/fields";

/** Base schema for registration input fields. */
export const AuthRegisterFormBaseSchema = z.object({
    name: preprocessEmptyToUndefined(UserPersonalNameSchema),
    email: preprocessEmptyToUndefined(UserEmailSchema),
    password: preprocessEmptyToUndefined(UserPasswordSchema),
    confirm: preprocessEmptyToUndefined(UserPasswordSchema),
});

/** Registration schema with cross-field validation for password confirmation. */
export const AuthRegisterFormSchema = AuthRegisterFormBaseSchema.superRefine(
    ({password, confirm}, ctx) => {
        if (password !== confirm) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords don't match.",
                path: ["confirm"],
            });
        }
    },
);

/** Type inferred from the registration form schema. */
export type AuthRegisterForm = z.infer<typeof AuthRegisterFormSchema>;

/** Form-compatible values for the registration schema. */
export type AuthRegisterFormValues = AnyValues<AuthRegisterForm>;
