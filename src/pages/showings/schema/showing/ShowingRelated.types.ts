/**
 * @file ShowingRelated.types.ts
 *
 * @summary
 * Inferred TypeScript types for related Showing collections.
 *
 * @description
 * Provides array and paginated types derived from
 * Showing-related Zod schemas.
 */

import {z} from "zod";
import {
    PaginatedShowingDetailsSchema,
    PaginatedShowingSchema,
    ShowingArraySchema,
    ShowingDetailsArraySchema
} from "@/pages/showings/schema/showing/ShowingRelated.schema.ts";

/**
 * Array of core Showings.
 */
export type ShowingArray = z.infer<typeof ShowingArraySchema>;

/**
 * Array of detailed Showings.
 */
export type ShowingDetailsArray = z.infer<typeof ShowingDetailsArraySchema>;

/**
 * Paginated collection of core Showings.
 */
export type PaginatedShowings = z.infer<typeof PaginatedShowingSchema>;

/**
 * Paginated collection of detailed Showings.
 */
export type PaginatedShowingDetails = z.infer<typeof PaginatedShowingDetailsSchema>;
