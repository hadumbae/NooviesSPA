/**
 * @fileoverview Base configuration type for admin mutation operations targeting a specific movie review.
 */

import {ObjectId} from "@/common/_schemas";

/** Configuration object containing the target movie review ID for mutation operations. */
export type MovieReviewMutationConfig = {
    reviewID: ObjectId
};