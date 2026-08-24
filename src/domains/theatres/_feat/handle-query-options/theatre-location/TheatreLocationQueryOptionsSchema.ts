/**
 * @fileoverview Zod schema and type definitions for querying theatre location options.
 */

import {z} from "zod";
import {preprocessOptionalField} from "@/common/_feat";
import {ISO3166Alpha2CountryCodeSchema, LocationTargetSchema} from "@/common/_schemas";
import {AnyValues} from "@/common/_types";

/** Schema for validating theatre location query options. */
export const TheatreLocationQueryOptionsSchema = z.object({
    target: preprocessOptionalField(LocationTargetSchema),
    country: preprocessOptionalField(ISO3166Alpha2CountryCodeSchema),
});

/** Parsed query options type derived from TheatreLocationQueryOptionsSchema. */
export type TheatreLocationQueryOptions = z.infer<typeof TheatreLocationQueryOptionsSchema>;

/** Form values type for theatre location query options. */
export type TheatreLocationQueryOptionsFormValues = AnyValues<TheatreLocationQueryOptions>;