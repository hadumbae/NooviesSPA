/**
 * @fileoverview Zod schemas and type definitions for validating person creation and update forms.
 */

import {z} from "zod";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {NonFutureDateStringSchema} from "@/common/schema/dates/NonFutureDateStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {AnyValues} from "@/common/types";
import {PersonBiographySchema, PersonNameSchema} from "@/domains/persons";

/** Zod schema for validating person form data. */
export const PersonFormSchema = z.object({
    _id: IDStringSchema.optional(),
    name: PersonNameSchema,
    biography: PersonBiographySchema,
    dob: NonFutureDateStringSchema,
    nationality: ISO3166Alpha2CountryCodeEnum,
});

/** Validated data structure for person forms. */
export type PersonFormData = z.infer<typeof PersonFormSchema>;

/** Type representing raw or partial input values for person form fields. */
export type PersonFormValues = AnyValues<PersonFormData>;
