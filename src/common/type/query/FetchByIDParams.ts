import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

import {RequestOptions} from "@/common/type/request/RequestOptions.ts";

/**
 * Parameters for fetching a single entity by its ObjectId.
 *
 * Combines common request options (e.g. `populate`, `lean`, etc.)
 * with a required `_id` field used to identify the target entity.
 *
 * @property _id - The ObjectId of the entity to fetch
 *
 * @example
 * ```ts
 * const params: FetchByIDParams = {
 *   _id: "64aef...b83f", // some ObjectId
 *   populate: true,
 * };
 * ```
 */
export type FetchByIDParams = RequestOptions & {
    /** The ObjectId of the entity to fetch. */
    _id: ObjectId
};