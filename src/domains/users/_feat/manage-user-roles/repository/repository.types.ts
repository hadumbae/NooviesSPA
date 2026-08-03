/**
 * @fileoverview Configuration types for repository functions that handle user administrative role modifications.
 */

import {ObjectId} from "@/common/_schemas";
import {UpdateUserAdminRoleFormData} from "@/domains/users/_feat/manage-user-roles/manage-admin-role";

/** Configuration parameters required to update a user's administrative role status. */
export type ManageUserAdminRoleConfig = {
    userId: ObjectId;
    data: UpdateUserAdminRoleFormData;
}