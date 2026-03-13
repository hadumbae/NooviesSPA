/**
 * @file Person.schema.ts
 * Zod schemas for person domain models and paginated responses.
 */

import {z} from "zod";

import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {CloudinaryImageSchema} from "@/common/schema/models/cloudinary-image/CloudinaryImageSchema.ts";
import {UTCDayOnlyDateTimeSchema} from "@/common/schema/date-time/iso-8601/UTCDayOnlyDateTimeSchema.ts";

import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";

/**
 * Base person schema.
 */
export const PersonSchema = z.object({
    _id: IDStringSchema.readonly(),
    slug: NonEmptyStringSchema.max(75, "Slug must not be more than 75 characters."),
    name: NonEmptyStringSchema.max(255, "Name must not be more than 255 characters."),
    biography: NonEmptyStringSchema.max(1000, "Must be 1000 characters or less."),
    dob: UTCDayOnlyDateTimeSchema,
    nationality: ISO3166Alpha2CountryCodeEnum,
    profileImage: CloudinaryImageSchema.nullable().optional(),
});

/**
 * Detailed person schema.
 */
export const PersonDetailsSchema = PersonSchema.extend({});

/**
 * Person collection schema.
 */
export const PersonArraySchema = z.array(PersonSchema, {
    required_error: "Required.",
    invalid_type_error: "Must be an array of persons.",
});

/**
 * Detailed person collection schema.
 */
export const PersonDetailsArraySchema = z.array(PersonDetailsSchema, {
    required_error: "Required.",
    invalid_type_error: "Must be an array of populated persons.",
});

/**
 * Paginated person response schema.
 */
export const PaginatedPersonsSchema =
    generatePaginationSchema(PersonSchema);

/**
 * Paginated detailed person response schema.
 */
export const PaginatedPersonDetailsSchema =
    generatePaginationSchema(PersonDetailsSchema);
