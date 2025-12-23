/**
 * User login form schemas.
 *
 * Defines field-level validation and a form-compatible wrapper
 * for authentication input.
 */
import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {EmailStringSchema} from "@/common/schema/strings/EmailStringSchema.ts";
import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";

/**
 * Base schema for user login credentials.
 *
 * @remarks
 * Field constraints:
 * - `email`: valid email, ≤ 255 characters
 * - `password`: 16–255 characters
 */
export const AuthLoginFormSchema = z.object({
    /**
     * Email address used for authentication.
     */
    email: EmailStringSchema
        .max(255, "Email must not be more than 255 characters."),

    /**
     * Password associated with the email.
     */
    password: NonEmptyStringSchema
        .min(16, "Password must be at least 16 characters.")
        .max(255, "Password must not be more than 255 characters."),
});

/**
 * Form-ready schema wrapper for login values.
 *
 * @remarks
 * Intended for form libraries that consume value-based schemas.
 */
export const AuthLoginFormValuesSchema =
    generateFormValueSchema(AuthLoginFormSchema);
