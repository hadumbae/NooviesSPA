import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {EmailStringSchema} from "@/common/schema/strings/EmailStringSchema.ts";

/**
 * Schema for user registration validation.
 *
 * Enforces:
 * - **Name**: non-empty, minimum 3 characters, maximum 255.
 * - **Email**: valid email format, maximum 255 characters.
 * - **Password**: non-empty, minimum 16 characters, maximum 255.
 * - **Confirm**: must match `password`, same character limits.
 *
 * Custom refinement ensures that `password` and `confirm` fields match.
 *
 * @example
 * ```ts
 * const result = UserRegisterSchema.safeParse({
 *   name: "Alice",
 *   email: "alice@example.com",
 *   password: "averysecurepassword123",
 *   confirm: "averysecurepassword123",
 * });
 *
 * if (!result.success) {
 *   console.log(result.error.format());
 * }
 * ```
 */
export const UserRegisterSchema = z.object(
    {
        /** Full name of the user. */
        name: NonEmptyStringSchema
            .min(3, "Name must be at least 3 characters.")
            .max(255, "Name must not be more than 255 characters."),

        /** Email address of the user. */
        email: EmailStringSchema
            .max(255, "Email must not be more than 255 characters."),

        /** Password chosen by the user. */
        password: NonEmptyStringSchema
            .min(16, "Password must be at least 16 characters.")
            .max(255, "Password must not be more than 255 characters."),

        /** Confirmation of the password. Must match `password`. */
        confirm: NonEmptyStringSchema
            .min(16, "Confirm must be at least 16 characters.")
            .max(255, "Confirm must not be more than 255 characters."),
    }
).superRefine(
    (values, ctx) => {
        const {password, confirm} = values;

        if (password !== confirm) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords don't match.",
                path: ["confirm"],
            });
        }
    }
);

/**
 * Schema for user login validation.
 *
 * Enforces:
 * - **Email**: valid email format, maximum 255 characters.
 * - **Password**: non-empty, minimum 16 characters, maximum 255.
 *
 * @example
 * ```ts
 * const result = UserLoginSchema.safeParse({
 *   email: "alice@example.com",
 *   password: "averysecurepassword123",
 * });
 *
 * if (!result.success) {
 *   console.log(result.error.format());
 * }
 * ```
 */
export const UserLoginSchema = z.object({
    /** Email address used to log in. */
    email: EmailStringSchema
        .max(255, "Email must not be more than 255 characters."),

    /** Password corresponding to the email. */
    password: NonEmptyStringSchema
        .min(16, "Password must be at least 16 characters.")
        .max(255, "Password must not be more than 255 characters."),
});
