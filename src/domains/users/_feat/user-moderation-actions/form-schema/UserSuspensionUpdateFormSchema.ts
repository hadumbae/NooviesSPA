/**
 * @fileoverview Validation schemas and types for user suspension state adjustment forms.
 */

import {z} from "zod";
import {AnyValues} from "@/common/_types";
import {BooleanValueSchema} from "@/common/_schemas";
import {UserSuspensionUpdateActionSchema} from "@/domains/users/_schema/fields";
import {
    UserModerationLogFormSchema
} from "@/domains/users/_feat/user-moderation-actions/form-schema/UserModerationLogFormSchema.ts";

/** Zod schema validating form input data for updating a user's suspension status. */
export const UserSuspensionUpdateFormSchema = UserModerationLogFormSchema.omit({action: true}).extend({
    action: UserSuspensionUpdateActionSchema,
    suspend: BooleanValueSchema,
});

/** TypeScript type inferred from the UserSuspensionUpdateFormSchema. */
export type UserSuspensionUpdateFormData = z.infer<typeof UserSuspensionUpdateFormSchema>;

/** TypeScript type representing relaxed or partial form input values derived from the data schema. */
export type UserSuspensionUpdateFormValues = AnyValues<UserSuspensionUpdateFormData>;