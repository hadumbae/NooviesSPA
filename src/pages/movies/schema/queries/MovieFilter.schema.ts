import {z} from 'zod';
import {DateStringSchema} from "@/common/schema/helpers/ZodDateHelpers.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";

/**
 * Schema for filtering movie query results.
 *
 * All fields are optional, allowing partial filter criteria.
 */
export const MovieQueryFilterSchema = z.object({
    /** Unique movie identifier (e.g. MongoDB ObjectId as string). */
    _id: IDStringSchema.optional(),
    /** Partial or full movie title to filter by (non-empty string). */
    title: NonEmptyStringSchema.optional(),
    /** Exact release date to filter by (YYYY-MM-DD format). */
    releaseDate: DateStringSchema.optional(),
    /** List of genre IDs to match (movies must include at least one). */
    genres: z.array(IDStringSchema).optional(),
});

/**
 * Schema for specifying movie query sorting options.
 *
 * Each sort field uses {@link MongooseSortOrderSchema}, typically `1` for ascending and `-1` for descending.
 */
export const MovieQuerySortSchema = z.object({
    /** Sort by release date (`1` ascending, `-1` descending). */
    sortByReleaseDate: MongooseSortOrderSchema.optional(),
    /** Sort by movie title (`1` ascending, `-1` descending). */
    sortByTitle: MongooseSortOrderSchema.optional(),
});

/**
 * Combined schema for both filtering and sorting movie queries.
 *
 * This merges {@link MovieQueryFilterSchema} and {@link MovieQuerySortSchema}
 * so a single object can be used for API query parameters or database lookups.
 */
export const MovieQueryOptionSchema = MovieQuerySortSchema.merge(MovieQueryFilterSchema);