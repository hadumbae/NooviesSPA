/**
 * @fileoverview Defines the Zod schema and types for filtering theatre query results.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/_schemas";
import {CoercedNumberValueSchema} from "@/common/_schemas/numbers/number-value/CoercedNumberValueSchema.ts";
import {ISO3166Alpha2CountryCodeSchema} from "@/common/_schemas/enums/ISO3166Alpha2CountryCodeSchema.ts";
import {IANATimezoneSchema} from "@/common/_schemas/time/IANATimezoneSchema.ts";
import {preprocessOptionalField} from "@/common/_feat";
import {TheatreNameSchema} from "@/domains/theatres";
import {CityStringSchema, PostalCodeSchema, StateStringSchema, StreetStringSchema} from "@/common/_models/location";

/** Zod schema defining filter parameters for querying theatre data. */
export const TheatreQueryMatchFilterSchema = z.object({
    _id: preprocessOptionalField(IDStringSchema),
    name: preprocessOptionalField(TheatreNameSchema),
    seatCapacity: preprocessOptionalField(CoercedNumberValueSchema),
    street: preprocessOptionalField(StreetStringSchema),
    city: preprocessOptionalField(CityStringSchema),
    state: preprocessOptionalField(StateStringSchema),
    country: preprocessOptionalField(ISO3166Alpha2CountryCodeSchema),
    postalCode: preprocessOptionalField(PostalCodeSchema),
    timezone: preprocessOptionalField(IANATimezoneSchema),
});

/** Inferred type for validated theatre match filters. */
export type TheatreQueryMatchFilters = z.infer<typeof TheatreQueryMatchFilterSchema>;