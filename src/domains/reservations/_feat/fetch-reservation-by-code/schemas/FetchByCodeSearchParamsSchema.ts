/**
 * @fileoverview Zod schema for validating administrative reservation search query parameters.
 */

import {z} from "zod";
import {ReservationUniqueCodeSchema} from "@/domains/reservations/_schema/model";

/** Validates the search criteria used to locate a reservation by its unique code. */
export const FetchByCodeSearchParamsSchema = z.object({
    /** The unique ticket code entered by the administrator, or null if unentered. */
    code: ReservationUniqueCodeSchema.optional().nullable().default(null),
});

/** TypeScript type inferred from FetchByCodeSearchParamsSchema. */
export type FetchByCodeSearchParams = z.infer<typeof FetchByCodeSearchParamsSchema>;