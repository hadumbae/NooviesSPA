/**
 * @fileoverview Validation schemas and types for user moderation log forms.
 */

import {z} from "zod";
import {ModerationLogMessageSchema} from "@/common/_schemas";
import {UserModerationLogActionSchema} from "@/domains/users/_schema/fields";
import {AnyValues} from "@/common/_types";

/** Zod schema validating form input data for recording a user moderation log entry. */
export const UserModerationLogFormSchema = z.object({
    action: UserModerationLogActionSchema,
    message: ModerationLogMessageSchema,
});

/** TypeScript type inferred from the UserModerationLogFormSchema. */
export type UserModerationLogFormData = z.infer<typeof UserModerationLogFormSchema>;

export type UserModerationLogFormValues = AnyValues<UserModerationLogFormData>;