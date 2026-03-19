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
 */
export const PaginatedReservationDetailsSchema =
    generatePaginationSchema(PopulatedReservationSchema);

/**
 * Inferred type from {@link PaginatedReservationDetailsSchema}.
 * * Represents a page of populated reservations, typically used for administrative
 * dashboards or user booking history lists.
 */
export type PaginatedReservationDetails =
    z.infer<typeof PaginatedReservationDetailsSchema>;