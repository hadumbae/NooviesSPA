/**
 * @fileoverview Zod schema and type definitions for filtering movie queries.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/_schemas";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {DateOnlyStringSchema} from "@/common/_schemas/dates/DateOnlyStringSchema.ts";
import {CoercedBooleanValueSchema} from "@/common/_schemas/boolean/CoercedBooleanValueSchema.ts";
import {ISO3166Alpha2CountryCodeSchema} from "@/common/_schemas/enums/ISO3166Alpha2CountryCodeSchema.ts";

/** Zod schema defining available filter parameters for querying movie documents. */
export const MovieQueryFilterSchema = z.object({
    _id: IDStringSchema.optional(),
    title: NonEmptyStringSchema.optional(),
    originalTitle: NonEmptyStringSchema.optional(),
    releaseDate: DateOnlyStringSchema.optional(),
    genres: z.array(IDStringSchema).optional(),
    isReleased: CoercedBooleanValueSchema.optional(),
    isAvailable: CoercedBooleanValueSchema.optional(),
    country: ISO3166Alpha2CountryCodeSchema.optional(),
});

/** Type representing movie query filter criteria. */
export type MovieQueryFilters = z.infer<typeof MovieQueryFilterSchema>;