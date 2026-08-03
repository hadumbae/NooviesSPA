/**
 * @fileoverview Validation schemas and types for the data returned after updating a user's account suspension status.
 */

import {z} from "zod";
import {LeanUserWithEmailSchema, UserModerationLogReferenceSchema} from "@/domains/users";

/** Zod schema validating the response structure containing updated user data and its moderation log reference. */
export const UpdateUserSuspensionReturnsSchema = z.object({
    user: LeanUserWithEmailSchema,
    log: UserModerationLogReferenceSchema,
});

/** TypeScript type inferred from the UpdateUserSuspensionReturnsSchema. */
export type UpdateUserSuspensionReturns = z.infer<typeof UpdateUserSuspensionReturnsSchema>;