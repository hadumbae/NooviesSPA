/**
 * @fileoverview Validation schemas and types for user role adjustment forms.
 */

import {z} from "zod";
import {AnyValues} from "@/common/_types";
import {UserRoleSchema} from "@/domains/users/_schema/fields";
import {UserRoleUpdateActionSchema} from "@/domains/users/_feat/manage-user-roles/schema";
import {
    UserModerationLogFormSchema
} from "@/domains/users/_feat/user-moderation-actions/form-schema/UserModerationLogFormSchema.ts";

/** Zod schema validating form input data for updating user roles, enforcing strict inclusion and non-empty bounds. */
export const UpdateUserAdminRoleFormSchema = UserModerationLogFormSchema.omit({action: true}).extend({
    action: UserRoleUpdateActionSchema,
    roles: z
        .array(UserRoleSchema, {invalid_type_error: "Must contain at least one role.", required_error: "Required."})
        .refine((roles) => roles.length > 0, {message: "Must define at least one role."})
        .refine((roles) => roles.includes("USER"), {message: "Must include the 'USER' role."}),
});

/** TypeScript type inferred from the UserRoleUpdateFormSchema. */
export type UpdateUserAdminRoleFormData = z.infer<typeof UpdateUserAdminRoleFormSchema>;

/** TypeScript type representing relaxed or partial form input values derived from the data schema. */
export type UpdateUserAdminRoleFormValues = AnyValues<UpdateUserAdminRoleFormData>;