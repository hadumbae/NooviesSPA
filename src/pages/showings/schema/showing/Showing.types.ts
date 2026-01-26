/**
 * @file Showing.types.ts
 *
 * TypeScript types inferred from Zod showing schemas.
 *
 * Provides strongly typed aliases derived directly from runtime schemas,
 * ensuring compile-time safety without duplication.
 */

import {z} from "zod";
import {
    PopulatedShowingSchema,
    ShowingConfigSchema,
    ShowingDetailsSchema,
    ShowingSchema,
} from "@/pages/showings/schema/showing/Showing.schema.ts";

/**
 * Showing configuration type.
 *
 * Inferred from {@link ShowingConfigSchema}.
 */
export type ShowingConfig = z.infer<typeof ShowingConfigSchema>;

/**
 * Core showing type.
 *
 * Inferred from {@link ShowingSchema}.
 * Uses reference IDs for related entities.
 */
export type Showing = z.infer<typeof ShowingSchema>;

/**
 * Showing type with populated relations.
 *
 * Inferred from {@link PopulatedShowingSchema}.
 * Replaces foreign key IDs with full documents.
 */
export type PopulatedShowing = z.infer<typeof PopulatedShowingSchema>;

/**
 * Detailed showing type with seat statistics.
 *
 * Inferred from {@link ShowingDetailsSchema}.
 * Includes populated relations and availability counters.
 */
export type ShowingDetails = z.infer<typeof ShowingDetailsSchema>;
