/**
 * @fileoverview Defines the complete validation schema and type for the User entity.
 */

import {z} from "zod";
import {LeanUserSchema} from "@/domains/users/_schema/user/LeanUserSchema.ts";
import {UserRoleEnumSchema} from "@/domains/users/_schema/fields/UserRoleEnum.ts";
import {generateArraySchema} from "@/common/_feat/validation-builders";

/** Complete validation schema for the User entity including assigned roles. */
export const UserSchema = LeanUserSchema.extend({
    roles: generateArraySchema(UserRoleEnumSchema).min(1, {message: "User must be assigned at least one role."}),
});

/** Fully validated User entity including roles. */
export type User = z.infer<typeof UserSchema>;