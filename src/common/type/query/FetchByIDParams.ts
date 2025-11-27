import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";

/**
 * # Fetch By ID Parameters
 *
 * Defines the parameter type for fetching a single entity by its ObjectId.
 *
 * Combines generic `RequestOptions` (e.g., `populate`, `lean`, headers, etc.)
 * with a required `_id` field to uniquely identify the entity.
 *
 * This type excludes pagination fields like `limit` since fetching by ID
 * returns a single record.
 *
 * @example
 * ```ts
 * const params: FetchByIDParams = {
 *   _id: "64aef...b83f",
 *   populate: true, // optional
 *   lean: true,     // optional
 * };
 * ```
 */
export type FetchByIDParams = Omit<RequestOptions, "limit"> & {
    /**
     * The ObjectId of the entity to fetch.
     * Must be a valid MongoDB ObjectId string.
     */
    _id: ObjectId;
};
