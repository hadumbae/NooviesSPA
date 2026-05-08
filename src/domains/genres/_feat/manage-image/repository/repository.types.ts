/**
 * @fileoverview Type definitions for the genre image management repository.
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/** Configuration for updating a genre image. */
export type UpdateGenreImageConfig = {
    _id: ObjectId;
    formData: FormData;
}

/** Configuration for removing a genre image. */
export type RemoveGenreImageConfig = {
    _id: ObjectId;
}