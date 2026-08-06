/**
 * @fileoverview Type definition for user status update request configuration options.
 */

import {ObjectId} from "@/common/_schemas";
import {UpdateUserStatusFormData} from "@/domains/users/_feat/manage-user-status/schema";

/** Configuration parameters required to update a user's status. */
export type UpdateUserStatusConfig = {
    userId: ObjectId;
    data: UpdateUserStatusFormData;
};