/**
 * @fileoverview Zod schema and type definitions for filtering person records.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/_schemas/strings/id-strings/IDStringSchema";
import {NonEmptyStringSchema} from "@/common/_schemas/strings/simple-strings/NonEmptyStringSchema";
import {DateOnlyStringSchema} from "@/common/_schemas/dates/DateOnlyStringSchema";
import {ISO3166Alpha2CountryCodeSchema} from "@/common/_schemas/enums/ISO3166Alpha2CountryCodeSchema";
import {preprocessOptionalField} from "@/common/_feat";

/** Zod schema for filtering Person documents by ID, name, birth date, or nationality. */
export const PersonQueryFilterSchema = z.object({
    _id: preprocessOptionalField(IDStringSchema),
    name: preprocessOptionalField(NonEmptyStringSchema),
    dob: preprocessOptionalField(DateOnlyStringSchema),
    nationality: preprocessOptionalField(ISO3166Alpha2CountryCodeSchema),
});

/** Type for Person query filter criteria. */
export type PersonQueryFilters = z.infer<typeof PersonQueryFilterSchema>;