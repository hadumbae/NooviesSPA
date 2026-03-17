/**
 * @file Paginated schemas for showing variants.
 * @filename PaginatedShowingSchemas.ts
 */

import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {ShowingSchema} from "@/domains/showings/schema/showing/ShowingSchema.ts";
import {ShowingDetailsSchema} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {PopulatedShowingSchema} from "@/domains/showings/schema/showing/PopulatedShowingSchema.ts";
import {z} from "zod";

/**
 * Paginated schema for core showings.
 */
export const PaginatedShowingSchema =
    generatePaginationSchema(ShowingSchema);

/**
 * Inferred paginated core showings type.
 */
export type PaginatedShowings =
    z.infer<typeof PaginatedShowingSchema>;

/**
 * Paginated schema for populated showings.
 */
export const PaginatedPopulatedShowingSchema =
    generatePaginationSchema(PopulatedShowingSchema);

/**
 * Inferred paginated populated showings type.
 */
export type PaginatedPopulatedShowings =
    z.infer<typeof PaginatedPopulatedShowingSchema>;

/**
 * Paginated schema for detailed showings.
 */
export const PaginatedShowingDetailsSchema =
    generatePaginationSchema(ShowingDetailsSchema);

/**
 * Inferred paginated detailed showings type.
 */
export type PaginatedShowingDetails =
    z.infer<typeof PaginatedShowingDetailsSchema>;