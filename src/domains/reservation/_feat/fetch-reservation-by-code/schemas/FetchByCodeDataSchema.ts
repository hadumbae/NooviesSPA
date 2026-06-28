/**
 * @fileoverview Zod schema for validating the administrative reservation lookup response.
 */

import {z} from "zod";
import {AdminReservationSchema, ReservationUniqueCodeSchema} from "@/domains/reservation/_schema/model";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/** Validates the data envelope returned by the administrative code lookup endpoint. */
export const FetchByCodeDataSchema = z.object({
    code: ReservationUniqueCodeSchema,
    reservation: AdminReservationSchema.nullable(),
    message: NonEmptyStringSchema.max(100, "Must be 100 characters or less."),
});

/** Represents the structured response for administrative ticket scanning or lookup features. */
export type FetchByCodeData = z.infer<typeof FetchByCodeDataSchema>;