import {z} from "zod";
import {generatePaginationSchema} from "@/common/schema/helpers/zodHelperFunctions.ts";
import {MovieCreditSchema} from "@/pages/moviecredit/schemas/MovieCreditSchema.ts";

/**
 * Zod schema for a paginated response of movie credit entries.
 *
 * This schema is generated using {@link generatePaginationSchema}, which wraps the
 * {@link MovieCreditSchema} into a paginated response format.
 *
 * The resulting object has the following structure:
 * - `totalItems`: The total number of movie credits matching the query (before pagination).
 * - `items`: An array of movie credits for the current page, each validated against {@link MovieCreditSchema}.
 *
 * Pagination parameters such as `page` and `perPage` are assumed to be part of the query/filter
 * used to produce the paginated data but are not included in the response schema itself.
 */
export const MovieCreditPaginationSchema = generatePaginationSchema(MovieCreditSchema);

/**
 * TypeScript type inferred from {@link MovieCreditPaginationSchema}.
 *
 * Represents the shape of a paginated response containing movie credit data.
 */
export type PaginatedMovieCredit = z.infer<typeof MovieCreditPaginationSchema>;