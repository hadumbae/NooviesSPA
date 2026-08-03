/**
 * @fileoverview Configuration types for repository functions handling user suspension state modifications.
 */

import {ObjectId} from "@/common/_schemas";
import {UpdateUserSuspensionFormData} from "@/domains/users/_feat/manage-user-suspension/schema";

/** Configuration parameters required to update a user's account suspension status. */
export type ManageUserSuspensionConfig = {
    userId: ObjectId;
    data: UpdateUserSuspensionFormData;
};