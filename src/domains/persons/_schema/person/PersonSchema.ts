/**
 * @fileoverview Defines the schema and type for person entities.
 */

import {z} from "zod";
import {IDStringSchema, SlugStringSchema} from "@/common/_schemas";
import {PersonNameSchema} from "@/domains/persons/_schema/fields/PersonNameSchema";
import {PersonBiographySchema} from "@/domains/persons/_schema/fields/PersonBiographySchema";
import {UTCDayOnlyDateTimeSchema} from "@/common/_schemas/date-time/UTCDayOnlyDateTimeSchema";
import {ISO3166Alpha2CountryCodeSchema} from "@/common/_schemas/enums/ISO3166Alpha2CountryCodeSchema";
import {CloudinaryImageSchema} from "@/common/_schemas/cloudinary-image/CloudinaryImageSchema";

/**
 * Zod schema for validating person objects.
 */
export const PersonSchema = z.object({
    _id: IDStringSchema.readonly(),
    slug: SlugStringSchema,
    name: PersonNameSchema,
    biography: PersonBiographySchema,
    dob: UTCDayOnlyDateTimeSchema,
    nationality: ISO3166Alpha2CountryCodeSchema,
    profileImage: CloudinaryImageSchema.nullable().optional(),
});

/** Represents a person entity. */
export type Person = z.infer<typeof PersonSchema>;