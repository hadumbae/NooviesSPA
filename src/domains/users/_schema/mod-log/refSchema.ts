/**
 * @fileoverview Defines the schema and type for user moderation log references.
 */

import {z} from "zod";
import {IDStringSchema, ISO8601DateTimeSchema, ModerationLogMessageSchema} from "@/common/_schemas";
import {UserModerationLogActionSchema} from "@/domains/users";

/** Zod schema for validating a user moderation log entry reference. */
export const UserModerationLogReferenceSchema = z.object({
    user: IDStringSchema,
    admin: IDStringSchema,
    action: UserModerationLogActionSchema,
    modDate: ISO8601DateTimeSchema,
    message: ModerationLogMessageSchema,
});

/** Reference object representing a single moderation action taken against a user. */
export type UserModerationLogReference = z.infer<typeof UserModerationLogReferenceSchema>;