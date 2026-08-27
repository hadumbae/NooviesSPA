/**
 * @fileoverview Zod schema for validating administrative reservation search query parameters.
 */

import {z} from "zod";
import {preprocessOptionalField} from "@/common/_feat";
import {ReservationUniqueCodeSchema} from "@/domains/reservations/_schema/model";

/** Validates the search criteria used to locate a reservation by its unique code. */
export const FetchByCodeSearchParamsSchema = z.object({
    code: preprocessOptionalField(ReservationUniqueCodeSchema),
});

/** TypeScript type inferred from FetchByCodeSearchParamsSchema. */
export type FetchByCodeSearchParams = z.infer<typeof FetchByCodeSearchParamsSchema>;