import {z, ZodType} from "zod";
import IUserPasswordUpdate from "@/pages/users/interfaces/IUserPasswordUpdate.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/**
 * Zod schema for validating the payload of
 * a user’s password update request.
 *
 * Ensures:
 * - `password` meets length constraints.
 * - `confirm` is provided.
 * - `password` and `confirm` match exactly.
 *
 * @public
 */
export const UserPasswordUpdateSubmitSchema: ZodType<IUserPasswordUpdate> = z
    .object({
        /**
         * The new password to set for the user.
         *
         * - Must be at least 16 characters.
         * - Must not exceed 255 characters.
         */
        password: NonEmptyStringSchema
            .min(16, "Must be at least 16 characters.")
            .max(255, "Must not be more than 255 characters."),

        /**
         * Confirmation of the new password.
         *
         * Should match the `password` field exactly.
         */
        confirm: NonEmptyStringSchema,
    })
    .refine(
        passwords => passwords.password === passwords.confirm,
        {message: "Passwords don't match.", path: ["confirm"]},
    );

export type UserPasswordUpdateSubmit = z.infer<typeof UserPasswordUpdateSubmitSchema>;