/**
 * @fileoverview Defines the schema and type for person entities.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema";
import {SlugStringSchema} from "@/common/schema/strings/simple-strings/SlugString";
import {PersonNameSchema} from "@/domains/persons/_schema/fields/PersonNameSchema";
import {PersonBiographySchema} from "@/domains/persons/_schema/fields/PersonBiographySchema";
import {UTCDayOnlyDateTimeSchema} from "@/common/schema/date-time/iso-8601/UTCDayOnlyDateTimeSchema";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum";
import {CloudinaryImageSchema} from "@/common/schema/models/cloudinary-image/CloudinaryImageSchema";

/**
 * Zod schema for validating person objects.
 */
export const PersonSchema = z.object({
    _id: IDStringSchema.readonly(),
    slug: SlugStringSchema,
    name: PersonNameSchema,
    biography: PersonBiographySchema,
    dob: UTCDayOnlyDateTimeSchema,
    nationality: ISO3166Alpha2CountryCodeEnum,
    profileImage: CloudinaryImageSchema.nullable().optional(),
});

/** Represents a person entity. */
export type Person = z.infer<typeof PersonSchema>;