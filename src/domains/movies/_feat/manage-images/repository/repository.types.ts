/**
 * @fileoverview Type definitions for the movie image repository operations.
 */

import {ObjectId} from "@/common/_schemas";

/** Configuration for uploading a movie poster image. */
export type UploadPosterImageConfig = {
    movieID: ObjectId;
    data: FormData;
}

/** Configuration for removing a movie poster image. */
export type RemovePosterImageConfig = {
    movieID: ObjectId;
}
