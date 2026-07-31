/**
 * @fileoverview Defines the complete validation schema and type for the User entity.
 */

import {z} from "zod";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {UserRoleSchema} from "@/domains/users/_schema/fields/UserRoleSchema.ts";
import {LeanUserWithEmailSchema} from "@/domains/users/_schema/user/LeanUserWithEmailSchema.ts";

/** Complete validation schema for the User entity including assigned roles. */
export const UserSchema = LeanUserWithEmailSchema.extend({
    roles: generateArraySchema(UserRoleSchema).min(1, {message: "User must be assigned at least one role."}),
});

/** Fully validated User entity including roles. */
export type User = z.infer<typeof UserSchema>;