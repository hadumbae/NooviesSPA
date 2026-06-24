/**
 * @fileoverview Defines the Zod schema and types for filtering theatre query results.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {CoercedNumberValueSchema} from "@/common/schema/numbers/number-value/CoercedNumberValueSchema.ts";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {IANATimezoneSchema} from "@/common/schema/date-time/IANATimezone.schema.ts";

/** Zod schema defining filter parameters for querying theatre data. */
export const TheatreQueryMatchFilterSchema = z.object({
        _id: IDStringSchema.optional(),
        name: NonEmptyStringSchema.optional(),
        seatCapacity: CoercedNumberValueSchema.optional(),
        street: NonEmptyStringSchema.max(2000, {message: "Max. 2000 Chars"}).optional(),
        city: NonEmptyStringSchema.max(500, {message: "Max. 500 Chars"}).optional(),
        state: NonEmptyStringSchema.max(500, {message: "Max. 500 Chars"}).optional(),
        country: ISO3166Alpha2CountryCodeEnum.optional(),
        postalCode: NonEmptyStringSchema.max(50, {message: "Max. 50 characters"}).optional(),
        timezone: IANATimezoneSchema.optional(),
    })
;

/** Inferred type for validated theatre match filters. */
export type TheatreQueryMatchFilters = z.infer<typeof TheatreQueryMatchFilterSchema>;