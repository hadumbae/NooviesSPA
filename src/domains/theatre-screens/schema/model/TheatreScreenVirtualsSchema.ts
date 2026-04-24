/**
 * @fileoverview Zod schema and type definitions for virtual theatre screen properties.
 */

import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {z} from "zod";

/**
 * Schema for calculated or derived theatre screen data.
 */
export const TheatreScreenVirtualsSchema = z.object({
    seatCount: NonNegativeNumberSchema,
    futureShowingCount: NonNegativeNumberSchema,
});

/** Virtual properties for the TheatreScreen component. */
export type TheatreScreenVirtuals = z.infer<typeof TheatreScreenVirtualsSchema>;