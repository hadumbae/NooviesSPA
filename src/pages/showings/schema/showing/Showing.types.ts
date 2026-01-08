import {z} from "zod";
import {
    PopulatedShowingSchema,
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

