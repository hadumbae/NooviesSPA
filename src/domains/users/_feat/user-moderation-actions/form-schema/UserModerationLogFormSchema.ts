/**
 * @fileoverview Validation schemas and types for user moderation log forms.
 */

import {z} from "zod";
import {ModerationLogMessageSchema} from "@/common/_schemas";
import {UserModerationLogActionSchema} from "@/domains/users/_schema/fields";
import {AnyValues} from "@/common/_types";
import {preprocessEmptyToUndefined} from "@/common/_feat";

/** Zod schema validating form input data for recording a user moderation log entry. */
export const UserModerationLogFormSchema = z.object({
    action: preprocessEmptyToUndefined(UserModerationLogActionSchema),
    message: preprocessEmptyToUndefined(ModerationLogMessageSchema),
});

/** TypeScript type inferred from the UserModerationLogFormSchema. */
export type UserModerationLogFormData = z.infer<typeof UserModerationLogFormSchema>;

/** TypeScript type representing relaxed or partial form input values derived from the data schema. */
export type UserModerationLogFormValues = AnyValues<UserModerationLogFormData>;