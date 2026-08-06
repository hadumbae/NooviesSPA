/**
 * @fileoverview Zod schema and type definition for the response returned after updating a user's status.
 */

import {z} from "zod";
import {UserModerationLogReferenceSchema, UserSchema} from "@/domains/users";

/** Zod schema for validating the return payload of a user status update operation. */
export const UpdateUserStatusReturnsSchema = z.object({
    user: UserSchema,
    log: UserModerationLogReferenceSchema,
});

/** Return payload type inferred from UpdateUserStatusReturnsSchema. */
export type UpdateUserStatusReturns = z.infer<typeof UpdateUserStatusReturnsSchema>;