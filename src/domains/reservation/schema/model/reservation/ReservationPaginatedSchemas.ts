/**
 * @file Pagination schema for fully populated reservation records.
 * @filename ReservationPaginatedSchemas.ts
 */

import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {PopulatedReservationSchema} from "@/domains/reservation/schema/model/reservation/PopulatedReservationSchema.ts";
import {z} from "zod";

/**
 * Validated pagination wrapper for {@link PopulatedReservationSchema}.
 * * @remarks
 * Uses {@link generatePaginationSchema} to provide standard metadata fields
 * (e.g., totalItems, perPage, page) alongside an array of populated reservations.
 * * This schema ensures that the data structure returned by the API matches the
 * expected paginated format before being consumed by the UI.
 */
export const PaginatedPopulatedReservationSchema =
    generatePaginationSchema(PopulatedReservationSchema);

/**
 * Inferred TypeScript type from {@link PaginatedPopulatedReservationSchema}.
 * * @remarks
 * Represents a single page of fully resolved reservation documents.
 * Typically utilized in administrative dashboards or user-facing
 * booking history lists where relational data (User, Showing) is required.
 */
export type PaginatedPopulatedReservationDetails =
    z.infer<typeof PaginatedPopulatedReservationSchema>;