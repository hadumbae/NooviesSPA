/**
 * @fileoverview Validation schemas and types for the data returned after updating a user's administrative roles.
 */

import {z} from "zod";
import {LeanUserWithEmailSchema} from "@/domains/users/_schema/user";
import {UserModerationLogReferenceSchema} from "@/domains/users/_schema/mod-log";

/** Zod schema validating the response structure containing updated user data and its moderation log reference. */
export const UserAdminRoleUpdateReturnsSchema = z.object({
    user: LeanUserWithEmailSchema,
    log: UserModerationLogReferenceSchema,
});

/** TypeScript type inferred from the UserAdminRoleUpdateReturnsSchema. */
export type UpdateUserAdminRoleReturns = z.infer<typeof UserAdminRoleUpdateReturnsSchema>;