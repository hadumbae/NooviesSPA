/**
 * @fileoverview Type definitions for profile image removal operations.
 */

import {ObjectId} from "@/common/_schemas";

/**
 * Configuration for removing a person's profile image.
 */
export type RemoveProfileImageConfig = {
    _id: ObjectId;
};