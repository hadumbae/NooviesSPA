/**
 * @fileoverview Type definitions for profile image repository operations.
 */

import {ObjectId} from "@/common/_schemas";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";

/**
 * Parameters for uploading a profile image.
 */
export type UploadProfileImageConfig = {
    _id: ObjectId;
    data: FormData;
    config?: Omit<RequestOptions, "limit">;
};

