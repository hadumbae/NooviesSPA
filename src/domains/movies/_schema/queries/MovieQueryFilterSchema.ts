/**
 * @fileoverview Zod schema and type definitions for filtering movie queries.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {DateOnlyStringSchema} from "@/common/schema/dates/DateOnlyStringSchema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";

/** Zod schema defining available filter parameters for querying movie documents. */
export const MovieQueryFilterSchema = z.object({
    _id: IDStringSchema.optional(),
    title: NonEmptyStringSchema.optional(),
    originalTitle: NonEmptyStringSchema.optional(),
    releaseDate: DateOnlyStringSchema.optional(),
    genres: z.array(IDStringSchema).optional(),
    isReleased: CoercedBooleanValueSchema.optional(),
    isAvailable: CoercedBooleanValueSchema.optional(),
    country: ISO3166Alpha2CountryCodeEnum.optional(),
});

/** Type representing movie query filter criteria. */
export type MovieQueryFilters = z.infer<typeof MovieQueryFilterSchema>;