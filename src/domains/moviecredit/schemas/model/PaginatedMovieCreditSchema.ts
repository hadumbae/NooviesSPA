/**
 * @fileoverview Collection-level schemas for paginated movie credit entities.
 * Provides validation and type definitions for standardized paginated API responses
 * containing movie credit records.
 */

import {z} from "zod";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {MovieCreditSchema} from "@/domains/moviecredit/schemas";

/**
 * Validates a paginated response object containing movie credits.
 */
export const PaginatedMovieCreditSchema = generatePaginationSchema(MovieCreditSchema);

/**
 * Represents a validated paginated response for movie credits.
 */
export type PaginatedMovieCredit = z.infer<typeof PaginatedMovieCreditSchema>;