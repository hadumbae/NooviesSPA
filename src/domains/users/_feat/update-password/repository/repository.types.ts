/**
 * @fileoverview Type definitions for the user password update repository.
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {UserPasswordUpdateFormData} from "@/domains/users/_feat/update-password/schema/UserPasswordUpdateFormSchema.ts";

/** Parameters for updating a user's password. */
export type PasswordUpdateData = {
    userID: ObjectId;
    data: UserPasswordUpdateFormData;
};