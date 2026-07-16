/**
 * @fileoverview Defines the Zod schema and types for filtering theatre query results.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/_schemas";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {CoercedNumberValueSchema} from "@/common/_schemas/numbers/number-value/CoercedNumberValueSchema.ts";
import {ISO3166Alpha2CountryCodeSchema} from "@/common/_schemas/enums/ISO3166Alpha2CountryCodeSchema.ts";
import {IANATimezoneSchema} from "@/common/_schemas/time/IANATimezoneSchema.ts";

/** Zod schema defining filter parameters for querying theatre data. */
export const TheatreQueryMatchFilterSchema = z.object({
        _id: IDStringSchema.optional(),
        name: NonEmptyStringSchema.optional(),
        seatCapacity: CoercedNumberValueSchema.optional(),
        street: NonEmptyStringSchema.max(2000, {message: "Max. 2000 Chars"}).optional(),
        city: NonEmptyStringSchema.max(500, {message: "Max. 500 Chars"}).optional(),
        state: NonEmptyStringSchema.max(500, {message: "Max. 500 Chars"}).optional(),
        country: ISO3166Alpha2CountryCodeSchema.optional(),
        postalCode: NonEmptyStringSchema.max(50, {message: "Max. 50 characters"}).optional(),
        timezone: IANATimezoneSchema.optional(),
    })
;

/** Inferred type for validated theatre match filters. */
export type TheatreQueryMatchFilters = z.infer<typeof TheatreQueryMatchFilterSchema>;