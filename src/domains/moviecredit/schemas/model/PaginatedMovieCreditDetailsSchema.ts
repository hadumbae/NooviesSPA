/**
 * @fileoverview Collection-level schemas for paginated detailed movie credits.
 * Defines the validation structure for responses containing a page of movie
 * credits with fully populated relations.
 */

import {z} from "zod";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {MovieCreditDetailsSchema} from "@/domains/moviecredit/schemas";

/**
 * Pagination schema for detailed movie credits.
 */
export const PaginatedMovieCreditDetailsSchema = generatePaginationSchema(MovieCreditDetailsSchema);

/**
 * Represents a validated paginated response of detailed movie credits.
 */
export type PaginatedMovieCreditDetails = z.infer<typeof PaginatedMovieCreditDetailsSchema>;