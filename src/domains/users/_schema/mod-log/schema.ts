/**
 * @fileoverview Defines the Zod schema and type for user moderation log entries with populated user data.
 */

import {z} from "zod";
import {UserSchema} from "@/domains/users/_schema/user";
import {UserModerationLogReferenceSchema} from "@/domains/users/_schema/mod-log/refSchema.ts";

/** Zod schema for a moderation log entry including full user and admin objects. */
export const UserModerationLogSchema = UserModerationLogReferenceSchema.omit({admin: true, user: true}).merge(z.object({
    user: UserSchema,
    admin: UserSchema,
}));

/** Represents a moderation log entry with populated user and admin details. */
export type UserModerationLog = z.infer<typeof UserModerationLogSchema>;