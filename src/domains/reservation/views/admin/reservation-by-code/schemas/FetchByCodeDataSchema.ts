/**
 * @file Zod schema for validating the administrative "Fetch by Code" API response.
 * @filename FetchByCodeDataSchema.ts
 */

import {z} from "zod";
import {
    AdminReservationSchema,
    ReservationUniqueCodeSchema
} from "@/domains/reservation/schema/model";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/**
 * Validates the full envelope returned by the administrative code lookup endpoint.
 */
export const FetchByCodeDataSchema = z.object({
    /** The verification code associated with this query. */
    code: ReservationUniqueCodeSchema,

    /** The resulting reservation record, including populated relations. */
    reservation: AdminReservationSchema,

    /** Human-readable status message for UI feedback. */
    message: NonEmptyStringSchema.max(100, "Must be 100 characters or less."),
});

/**
 * TypeScript type inferred from {@link FetchByCodeDataSchema}.
 */
export type FetchByCodeData = z.infer<typeof FetchByCodeDataSchema>;