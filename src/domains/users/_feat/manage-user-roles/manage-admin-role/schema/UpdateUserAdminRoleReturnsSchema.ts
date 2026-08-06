/**
 * @fileoverview Validation schemas and types for the data returned after updating a user's administrative roles.
 */

import {z} from "zod";
import {UserModerationLogReferenceSchema} from "@/domains/users/_schema/mod-log";
import {UserSchema} from "@/domains/users/_schema/user";

/** Zod schema validating the response structure containing updated user data and its moderation log reference. */
export const UserAdminRoleUpdateReturnsSchema = z.object({
    user: UserSchema,
    log: UserModerationLogReferenceSchema,
});

/** TypeScript type inferred from the UserAdminRoleUpdateReturnsSchema. */
export type UpdateUserAdminRoleReturns = z.infer<typeof UserAdminRoleUpdateReturnsSchema>;