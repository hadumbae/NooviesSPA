/**
 * User registration form schemas.
 *
 * Defines base field validation, cross-field constraints,
 * and form-compatible value wrapping.
 */
import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {EmailStringSchema} from "@/common/schema/strings/EmailStringSchema.ts";
import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";

/**
 * Base schema for registration input.
 *
 * @remarks
 * Field constraints:
 * - `name`: 3–255 characters
 * - `email`: valid email, ≤ 255 characters
 * - `password`: 16–255 characters
 * - `confirm`: same constraints as `password`
 */
export const AuthRegisterFormBaseSchema = z.object({
    /**
     * User's full name.
     */
    name: NonEmptyStringSchema
        .min(3, "Name must be at least 3 characters.")
        .max(255, "Name must not be more than 255 characters."),

    /**
     * User's email address.
     */
    email: EmailStringSchema
        .max(255, "Email must not be more than 255 characters."),

    /**
     * User-chosen password.
     */
    password: NonEmptyStringSchema
        .min(16, "Password must be at least 16 characters.")
        .max(255, "Password must not be more than 255 characters."),

    /**
     * Password confirmation.
     */
    confirm: NonEmptyStringSchema
        .min(16, "Confirm must be at least 16 characters.")
        .max(255, "Confirm must not be more than 255 characters."),
});

/**
 * Registration schema with cross-field validation applied.
 *
 * @remarks
 * Ensures `password` and `confirm` values are identical.
 */
export const AuthRegisterFormSchema =
    AuthRegisterFormBaseSchema.superRefine((values, ctx) => {
        if (values.password !== values.confirm) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords don't match.",
                path: ["confirm"],
            });
        }
    });

/**
 * Form-ready wrapper for registration values.
 *
 * @remarks
 * Intended for form libraries that consume value-based schemas.
 */
export const AuthRegisterFormValuesSchema =
    generateFormValueSchema(AuthRegisterFormBaseSchema);
