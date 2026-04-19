/**
 * @fileoverview Type definitions for profile image removal operations.
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Configuration for removing a person's profile image.
 */
export type RemoveProfileImageConfig = {
    _id: ObjectId;
};