/**
 * @fileoverview Defines the schema and type for user moderation log references.
 */

import {z} from "zod";
import {ISO8601DateTimeSchema} from "@/common/_schemas/iso-8601";
import {UserModerationLogActionSchema} from "@/domains/users/_schema/fields";
import {IDStringSchema, ModerationLogMessageSchema} from "@/common/_schemas/strings";

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