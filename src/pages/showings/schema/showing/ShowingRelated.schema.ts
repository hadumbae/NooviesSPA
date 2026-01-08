/**
 * @file ShowingRelated.schema.ts
 *
 * @summary
 * Zod schemas for array and paginated Showing variants.
 *
 * @description
 * Defines array and paginated schemas for core and detailed
 * Showing representations.
 */

import {z} from "zod";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {ShowingDetailsSchema, ShowingSchema} from "@/pages/showings/schema/showing/Showing.schema.ts";

/**
 * Array schema for core Showings.
 */
export const ShowingArraySchema = z.array(ShowingSchema);

/**
 * Array schema for detailed Showings.
 */
export const ShowingDetailsArraySchema = z.array(ShowingDetailsSchema);

/**
 * Paginated schema for core Showings.
 */
export const PaginatedShowingSchema =
    generatePaginationSchema(ShowingSchema);

/**
 * Paginated schema for detailed Showings.
 */
export const PaginatedShowingDetailsSchema =
    generatePaginationSchema(ShowingDetailsSchema);
