import {z} from 'zod';
import {DateStringSchema} from "@/common/schema/helpers/ZodDateHelpers.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";

/**
 * Zod schema defining optional filters used when querying for movies.
 *
 * Fields include common attributes like `title`, `releaseDate`, and `genres`,
 * and each is optional to allow partial filtering.
 *
 * @property title - An optional non-empty string representing the movie title.
 * @property releaseDate - An optional ISO 8601 date string representing the release date.
 * @property genres - An optional array of genre IDs (as strings) to filter by.
 */
export const MovieFilterQuerySchema = z.object({
    title: NonEmptyStringSchema.optional(),
    releaseDate: DateStringSchema.optional(),
    genres: z.array(IDStringSchema).optional(),
});

/**
 * Type representing the shape of a valid movie filter query.
 *
 * Derived from {@link MovieFilterQuerySchema}, this type is typically used
 * to validate or type-check query parameters for searching or filtering movies.
 */
export type MovieFilterQuery = z.infer<typeof MovieFilterQuerySchema>;