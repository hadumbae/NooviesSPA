import { z } from "zod";
import {
    PaginatedShowingDetailsSchema,
    PaginatedShowingSchema,
    ShowingArraySchema,
    ShowingDetailsArraySchema,
    ShowingDetailsSchema,
    ShowingSchema,
} from "@/pages/showings/schema/showing/Showing.schema.ts";

/**
 * @file Provides TypeScript types inferred from Zod schemas
 * related to movie showings, including detailed, array, and
 * paginated representations.
 *
 * @module ShowingTypes
 */

/**
 * Represents a single movie showing document.
 *
 * @remarks
 * Derived from {@link ShowingSchema}.
 * Includes reference IDs to associated movie, theatre, and screen.
 */
export type Showing = z.infer<typeof ShowingSchema>;

/**
 * Represents a movie showing document with fully populated
 * relational data.
 *
 * @remarks
 * Derived from {@link ShowingDetailsSchema}.
 * Replaces reference IDs with nested objects:
 * - `movie`
 * - `theatre`
 * - `screen`
 * - `seating`
 */
export type ShowingDetails = z.infer<typeof ShowingDetailsSchema>;

/**
 * Represents an array of basic movie showings.
 *
 * @remarks
 * Derived from {@link ShowingArraySchema}.
 */
export type ShowingArray = z.infer<typeof ShowingArraySchema>;

/**
 * Represents an array of detailed movie showings
 * (with fully expanded relational data).
 *
 * @remarks
 * Derived from {@link ShowingDetailsArraySchema}.
 */
export type ShowingDetailsArray = z.infer<typeof ShowingDetailsArraySchema>;

/**
 * Represents a paginated list of movie showings.
 *
 * @remarks
 * Derived from {@link PaginatedShowingSchema}.
 * Useful for paginated API responses returning basic showing data.
 */
export type PaginatedShowings = z.infer<typeof PaginatedShowingSchema>;

/**
 * Represents a paginated list of detailed movie showings.
 *
 * @remarks
 * Derived from {@link PaginatedShowingDetailsSchema}.
 * Useful for paginated API responses including related movie, theatre, and screen data.
 */
export type PaginatedShowingDetails = z.infer<typeof PaginatedShowingDetailsSchema>;
