/**
 * @file Zod schema for validating the administrative "Fetch by Code" API response envelope.
 * @filename FetchByCodeDataSchema.ts
 */

import {z} from "zod";
import {
    AdminReservationSchema,
    ReservationUniqueCodeSchema
} from "@/domains/reservation/schema/model";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/**
 * Validates the full data envelope returned by the administrative code lookup endpoint.
 */
export const FetchByCodeDataSchema = z.object({
    /** The human-readable verification code that was used for the query. */
    code: ReservationUniqueCodeSchema,

    /** * The retrieved reservation record.
     * Returns `null` if no record matches the provided `code`.
     */
    reservation: AdminReservationSchema.nullable(),

    /** * Descriptive feedback for the administrator (e.g., "Reservation found successfully").
     * Constrained to 100 characters for concise UI messaging.
     */
    message: NonEmptyStringSchema.max(100, "Must be 100 characters or less."),
});

/**
 * TypeScript type inferred from {@link FetchByCodeDataSchema}.
 * Represents the structured response for administrative ticket scanning or lookup features.
 */
export type FetchByCodeData = z.infer<typeof FetchByCodeDataSchema>;