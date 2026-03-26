/**
 * @file Zod schema for validating the administrative "Fetch by Code" API response.
 * @filename FetchReservationByCodeSchema.ts
 */

import {z} from "zod";
import {PopulatedReservationSchema, ReservationUniqueCodeSchema} from "@/domains/reservation/schema/model";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/**
 * Validates the full envelope returned by the administrative code lookup endpoint.
 */
export const FetchReservationByCodeSchema = z.object({
    /** The verification code associated with this query. */
    code: ReservationUniqueCodeSchema,

    /** The resulting reservation record, including populated relations. */
    reservation: PopulatedReservationSchema,

    /** Human-readable status message for UI feedback. */
    message: NonEmptyStringSchema.max(100, "Must be 100 characters or less."),
});

/**
 * TypeScript type inferred from {@link FetchReservationByCodeSchema}.
 */
export type FetchReservationByCodeData = z.infer<typeof FetchReservationByCodeSchema>;