/**
 * @fileoverview Zod schema and type definitions for filtering movie queries.
 */

import {z} from "zod";
import {IDStringSchema, NonEmptyStringSchema} from "@/common/_schemas";
import {DateOnlyStringSchema} from "@/common/_schemas/dates/DateOnlyStringSchema.ts";
import {CoercedBooleanValueSchema} from "@/common/_schemas/boolean/CoercedBooleanValueSchema.ts";
import {ISO3166Alpha2CountryCodeSchema} from "@/common/_schemas/enums/ISO3166Alpha2CountryCodeSchema.ts";
import {preprocessOptionalField} from "@/common/_feat";

/** Zod schema defining available filter parameters for querying movie documents. */
export const MovieQueryFilterSchema = z.object({
    _id: preprocessOptionalField(IDStringSchema),
    title: preprocessOptionalField(NonEmptyStringSchema),
    originalTitle: preprocessOptionalField(NonEmptyStringSchema),
    releaseDate: preprocessOptionalField(DateOnlyStringSchema),
    isReleased: preprocessOptionalField(CoercedBooleanValueSchema),
    isAvailable: preprocessOptionalField(CoercedBooleanValueSchema),
    country: preprocessOptionalField(ISO3166Alpha2CountryCodeSchema),
});

/** Type representing movie query filter criteria. */
export type MovieQueryFilters = z.infer<typeof MovieQueryFilterSchema>;