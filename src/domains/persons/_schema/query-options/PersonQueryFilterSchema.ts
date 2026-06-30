/**
 * @fileoverview Zod schema and type definitions for filtering person records.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema";
import {NonEmptyStringSchema} from "@/common/_schemas/strings/NonEmptyStringSchema";
import {DateOnlyStringSchema} from "@/common/schema/dates/DateOnlyStringSchema";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum";
import {
    preprocessEmptyStringToUndefined
} from "@/common/_feat/validation-preprocessors/preprocessEmptyStringToUndefined";

/** Zod schema for filtering Person documents by ID, name, birth date, or nationality. */
export const PersonQueryFilterSchema = z.object({
    _id: IDStringSchema.optional(),
    name: preprocessEmptyStringToUndefined(NonEmptyStringSchema.optional()),
    dob: DateOnlyStringSchema.optional(),
    nationality: ISO3166Alpha2CountryCodeEnum.optional(),
});

/** Type for Person query filter criteria. */
export type PersonQueryFilters = z.infer<typeof PersonQueryFilterSchema>;