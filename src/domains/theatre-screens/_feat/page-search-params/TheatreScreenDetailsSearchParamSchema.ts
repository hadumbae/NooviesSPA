/**
 * @fileoverview Zod schema for search and pagination parameters on the Theatre Screen Details page.
 */

import {z} from "zod";
import {TheatreScreenDetailsActiveTabSchema} from "./TheatreScreenDetailsActiveTabSchema.ts";
import {CoercedNonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/** Schema for query parameters used when searching or paginating through a theatre screen's data. */
export const TheatreScreenDetailsSearchParamSchema = z.object({
    activeTab: TheatreScreenDetailsActiveTabSchema.optional().default("seating"),
    seatPage: CoercedNonNegativeNumberSchema.optional().default(1),
    seatsPerPage: CoercedNonNegativeNumberSchema.optional().default(15),
    showingPage: CoercedNonNegativeNumberSchema.optional().default(1),
    showingsPerPage: CoercedNonNegativeNumberSchema.optional().default(15),
});

/** Type representing search and pagination parameters for viewing seat or showing data. */
export type TheatreScreenDetailsSearchParams = z.infer<typeof TheatreScreenDetailsSearchParamSchema>;