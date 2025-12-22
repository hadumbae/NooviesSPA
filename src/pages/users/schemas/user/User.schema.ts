import { z } from "zod";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { EmailStringSchema } from "@/common/schema/strings/EmailStringSchema.ts";
import { BooleanValueSchema } from "@/common/schema/boolean/BooleanValueSchema.ts";

/**
 * @file User.schema.ts
 *
 * @summary
 * Zod schema for user entities.
 *
 * @description
 * Defines the core structure of a user within the system, including
 * identity information and authorization context. This schema is used
 * for runtime validation and type inference at API boundaries and
 * internal data handling layers.
 *
 * Intended usage:
 * - Validating user data returned from APIs
 * - Enforcing consistent user shape across the application
 * - Type inference for user-related logic
 */

/**
 * User schema.
 *
 * @remarks
 * Represents the minimal persisted user model required by the system.
 */
export const UserSchema = z.object({
    /** Full name of the user. */
    name: NonEmptyStringSchema,

    /** Email address of the user. */
    email: EmailStringSchema,

    /** Flag indicating whether the user has administrative privileges. */
    isAdmin: BooleanValueSchema,
});