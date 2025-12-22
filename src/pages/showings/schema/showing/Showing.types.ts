import { z } from "zod";
import {
    PaginatedShowingDetailsSchema,
    PaginatedShowingSchema,
    PopulatedShowingSchema,
    ShowingArraySchema,
    ShowingDetailsArraySchema,
    ShowingDetailsSchema,
    ShowingSchema,
} from "@/pages/showings/schema/showing/Showing.schema.ts";

/**
 * @file Showing.types.ts
 *
 * @summary
 * TypeScript types inferred from Zod showing schemas.
 *
 * @description
 * Provides strongly typed aliases derived from showing-related Zod schemas,
 * covering:
 * - Core showing entities
 * - Populated and detailed variants
 * - Array-based collections
 * - Paginated API response shapes
 *
 * These types ensure compile-time safety while staying fully aligned with
 * runtime validation logic.
 */

/**
 * Core showing type.
 *
 * @remarks
 * Inferred from {@link ShowingSchema}.
 * Uses reference IDs for related movie, theatre, and screen entities.
 */
export type Showing = z.infer<typeof ShowingSchema>;

/**
 * Showing type with populated relations.
 *
 * @remarks
 * Inferred from {@link PopulatedShowingSchema}.
 * Replaces foreign key IDs with full related documents.
 */
export type PopulatedShowing = z.infer<typeof PopulatedShowingSchema>;

/**
 * Detailed showing type with populated relations and seat statistics.
 *
 * @remarks
 * Inferred from {@link ShowingDetailsSchema}.
 * Includes populated `movie`, `theatre`, and `screen` objects, along with
 * seat availability counters.
 */
export type ShowingDetails = z.infer<typeof ShowingDetailsSchema>;

/**
 * Array of core showing entities.
 *
 * @remarks
 * Inferred from {@link ShowingArraySchema}.
 */
export type ShowingArray = z.infer<typeof ShowingArraySchema>;

/**
 * Array of detailed showing entities.
 *
 * @remarks
 * Inferred from {@link ShowingDetailsArraySchema}.
 * Useful for list views requiring expanded relational data.
 */
export type ShowingDetailsArray = z.infer<typeof ShowingDetailsArraySchema>;

/**
 * Paginated collection of core showings.
 *
 * @remarks
 * Inferred from {@link PaginatedShowingSchema}.
 * Intended for paginated API responses returning minimal showing data.
 */
export type PaginatedShowings = z.infer<typeof PaginatedShowingSchema>;

/**
 * Paginated collection of detailed showings.
 *
 * @remarks
 * Inferred from {@link PaginatedShowingDetailsSchema}.
 * Intended for paginated API responses that include populated relations
 * and seat statistics.
 */
export type PaginatedShowingDetails = z.infer<typeof PaginatedShowingDetailsSchema>;
