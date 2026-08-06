/**
 * @fileoverview Zod schema and type definitions for user status update form validation.
 */

import {z} from "zod";
import {AnyUnionValues} from "@/common/_types";
import {UserStatusSchema} from "@/domains/users/_schema/fields";
import {UserModerationLogFormSchema} from "@/domains/users/_feat/user-moderation-actions";
import {
    UserStatusUpdateActionSchema
} from "@/domains/users/_feat/manage-user-status/schema/UserStatusUpdateActionSchema.ts";

const BaseSchema = UserModerationLogFormSchema.pick({message: true});

const ActivateSchema = BaseSchema.extend({
    action: UserStatusUpdateActionSchema.extract(["user_account_activated"]),
    status: UserStatusSchema.extract(["ACTIVE", "SUSPENDED"]),
});

const DeactivateSchema = BaseSchema.extend({
    action: UserStatusUpdateActionSchema.extract(["user_account_deactivated"]),
    status: UserStatusSchema.extract(["INACTIVE"]),
});

/** Zod schema for validating user status update form submissions using a discriminated union. */
export const UpdateUserStatusFormSchema = z.discriminatedUnion("action", [ActivateSchema, DeactivateSchema]);

/** Form data type inferred from UpdateUserStatusFormSchema. */
export type UpdateUserStatusFormData = z.infer<typeof UpdateUserStatusFormSchema>;

/** Union value type representing all valid field combinations for the user status update form. */
export type UpdateUserStatusFormValues = AnyUnionValues<UpdateUserStatusFormData>;