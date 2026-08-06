/**
 * @fileoverview Validation schemas and types for the data returned after updating a user's account suspension status.
 */

import {z} from "zod";
import {UserSchema} from "@/domains/users/_schema/user";
import {UserModerationLogReferenceSchema} from "@/domains/users/_schema/mod-log";

/** Zod schema validating the response structure containing updated user data and its moderation log reference. */
export const UpdateUserSuspensionReturnsSchema = z.object({
    user: UserSchema,
    log: UserModerationLogReferenceSchema,
});

/** TypeScript type inferred from the UpdateUserSuspensionReturnsSchema. */
export type UpdateUserSuspensionReturns = z.infer<typeof UpdateUserSuspensionReturnsSchema>;