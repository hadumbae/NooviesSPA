/**
 * @file Zod validation schemas for User entities at various levels of data density.
 * @filename User.schema.ts
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {EmailStringSchema} from "@/common/schema/strings/EmailStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {UserRoleEnumSchema} from "@/domains/users/schemas/enums/UserRoleEnum.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";

/**
 * Foundation schema for identifying a user with minimal metadata.
 */
export const LeanUserSchema = z.object({
    _id: IDStringSchema,
    name: NonEmptyStringSchema,
});

/**
 * Extended lean schema including contact information.
 */
export const LeanUserWithEmailSchema = LeanUserSchema.extend({
    email: EmailStringSchema,
});

/**
 * Complete validation schema for the User entity.
 */
export const UserSchema = LeanUserSchema.extend({
    roles: generateArraySchema(UserRoleEnumSchema)
        .min(1, {message: "User must be assigned at least one role."}),
});