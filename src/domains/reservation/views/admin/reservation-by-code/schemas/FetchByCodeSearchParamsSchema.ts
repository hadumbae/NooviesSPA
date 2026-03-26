/**
 * @file Zod schema for validating administrative search query parameters.
 * @filename FetchByCodeSearchParamsSchema.ts
 */

import {z} from "zod";
import {ReservationUniqueCodeSchema} from "@/domains/reservation/schema/model";

/**
 * Validates the search criteria used to locate a reservation.
 */
export const FetchByCodeSearchParamsSchema = z.object({
    /** The unique ticket code entered by the administrator. */
    code: ReservationUniqueCodeSchema,
});

/**
 * TypeScript type inferred from {@link FetchByCodeSearchParamsSchema}.
 */
export type FetchByCodeSearchParams = z.infer<typeof FetchByCodeSearchParamsSchema>;