/**
 * @fileoverview Zod schemas and type definitions for validating person creation and update forms.
 */

import {z} from "zod";
import {ISO3166Alpha2CountryCodeSchema} from "@/common/_schemas/enums/ISO3166Alpha2CountryCodeSchema.ts";
import {NonFutureDateStringSchema} from "@/common/_schemas/dates/NonFutureDateStringSchema.ts";
import {IDStringSchema} from "@/common/_schemas";
import {AnyValues} from "@/common/_types";
import {PersonBiographySchema, PersonNameSchema} from "@/domains/persons";
import {preprocessEmptyToUndefined} from "@/common/_feat";

/** Zod schema for validating person form data. */
export const PersonFormSchema = z.object({
    _id: IDStringSchema.optional(),
    name: preprocessEmptyToUndefined(PersonNameSchema),
    biography: preprocessEmptyToUndefined(PersonBiographySchema),
    dob: preprocessEmptyToUndefined(NonFutureDateStringSchema),
    nationality: preprocessEmptyToUndefined(ISO3166Alpha2CountryCodeSchema),
});

/** Validated data structure for person forms. */
export type PersonFormData = z.infer<typeof PersonFormSchema>;

/** Type representing raw or partial input values for person form fields. */
export type PersonFormValues = AnyValues<PersonFormData>;
