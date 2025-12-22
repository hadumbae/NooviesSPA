import { z } from "zod";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { EmailStringSchema } from "@/common/schema/strings/EmailStringSchema.ts";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import { UserRoleEnumSchema } from "@/pages/users/schemas/enums/UserRoleEnum.ts";

/**
 * @file User.schema.ts
 *
 * @summary
 * Zod schema defining the core structure of a User entity.
 *
 * @description
 * This schema is used to validate user data across the application.
 * It enforces constraints on required fields such as `_id`, `name`, `email`,
 * and `roles`, ensuring consistent structure and type safety at runtime.
 *
 * Use cases:
 * - Validate user data returned from APIs.
 * - Enforce consistent user shapes in internal services.
 * - Enable type inference for user-related logic in TypeScript.
 */

/**
 * Zod schema representing a user entity.
 *
 * @remarks
 * - `_id`: Unique identifier of the user.
 * - `name`: Non-empty full name of the user.
 * - `email`: User's email address, must be valid.
 * - `roles`: Array of roles assigned to the user; at least one role is required.
 *
 * @example
 * ```ts
 * import { UserSchema } from './User.schema.ts';
 *
 * const userData = {
 *   _id: "64b0f1f1e3b8c3d1f4a2a2b3",
 *   name: "Jane Doe",
 *   email: "jane@example.com",
 *   roles: ["USER"]
 * };
 *
 * UserSchema.parse(userData); // ✅ validates successfully
 * ```
 */
export const UserSchema = z.object({
    /** Unique identifier for the user. */
    _id: IDStringSchema,

    /** Full name of the user. Must be a non-empty string. */
    name: NonEmptyStringSchema,

    /** Email address of the user. Must be a valid email string. */
    email: EmailStringSchema,

    /** Roles assigned to the user. Must contain at least one valid role. */
    roles: generateArraySchema(UserRoleEnumSchema)
        .min(1, { message: "Must not be an empty array." }),
});
