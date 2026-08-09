/**
 * @fileoverview Validation schemas and type definitions for user role adjustment forms.
 */

import {z} from "zod";
import {AnyValues} from "@/common/_types";
import {UserRoleSchema} from "@/domains/users/_schema/fields";
import {UserRoleUpdateActionSchema} from "@/domains/users/_feat/manage-user-roles/schema";
import {
    UserModerationLogFormSchema
} from "@/domains/users/_feat/user-moderation-actions/form-schema/UserModerationLogFormSchema.ts";

const BaseSchema = UserModerationLogFormSchema.pick({message: true});

const RoleArraySchema = z
    .array(UserRoleSchema, {invalid_type_error: "Must be an array of least one role.", required_error: "Required."})
    .refine((roles) => roles.length > 0, {message: "Must define at least one role."});

const GrantSchema = BaseSchema.extend({
    action: UserRoleUpdateActionSchema.extract(["user_role_grant_admin"]),
    roles: RoleArraySchema
        .refine((roles) => roles.includes("USER"), {message: "Must include the 'USER' role."})
        .refine((roles) => roles.includes("ADMIN"), {message: "Must include the 'ADMIN' role."}),
});

const RevokeSchema = BaseSchema.extend({
    action: UserRoleUpdateActionSchema.extract(["user_role_revoke_admin"]),
    roles: RoleArraySchema
        .refine((roles) => roles.includes("USER"), {message: "Must include the 'USER' role."})
        .refine((roles) => !roles.includes("ADMIN"), {message: "Must not include the 'ADMIN' role."}),
});

/** Zod schema for validating form input data when updating user admin roles using a discriminated union. */
export const UpdateUserAdminRoleFormSchema = z.discriminatedUnion("action", [GrantSchema, RevokeSchema]);

/** Form data type inferred from UpdateUserAdminRoleFormSchema. */
export type UpdateUserAdminRoleFormData = z.infer<typeof UpdateUserAdminRoleFormSchema>;

/** Permissive form values type derived from UpdateUserAdminRoleFormData for form state handling. */
export type UpdateUserAdminRoleFormValues = AnyValues<UpdateUserAdminRoleFormData>;