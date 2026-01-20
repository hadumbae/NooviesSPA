/**
 * @file Person.schema.ts
 *
 * Zod schemas for validating person entities.
 * Used across API boundaries, forms, and UI data models.
 */

import {z} from "zod";

import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {CloudinaryImageSchema} from "@/common/schema/models/cloudinary-image/CloudinaryImageSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {UTCDayOnlyDateTimeSchema} from "@/common/schema/date-time/iso-8601/UTCDayOnlyDateTimeSchema.ts";

import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";

/**
 * Base schema for a person entity.
 *
 * Represents core identity and profile data.
 */
export const PersonSchema = z.object({
    /** Unique identifier (read-only). */
    _id: IDStringSchema.readonly(),

    /** URL-friendly identifier. */
    slug: NonEmptyStringSchema.max(75, "Slug must not be more than 75 characters."),

    /** Full name of the person. */
    name: NonEmptyStringSchema.max(255, "Name must not be more than 255 characters."),

    /** Short biography. */
    biography: NonEmptyStringSchema.max(1000, "Must be 1000 characters or less."),

    /** Date of birth (UTC, day-only). */
    dob: UTCDayOnlyDateTimeSchema,

    /** Nationality (ISO 3166-1 alpha-2). */
    nationality: ISO3166Alpha2CountryCodeEnum,

    /** Optional Cloudinary profile image. */
    profileImage: CloudinaryImageSchema.nullable().optional(),
});

/**
 * Extended person schema with aggregate counts.
 *
 * Used for populated or detailed views.
 */
export const PersonDetailsSchema = PersonSchema.extend({
    /** Total number of associated credits. */
    creditCount: NonNegativeNumberSchema,

    /** Total number of associated movies. */
    movieCount: NonNegativeNumberSchema,
});

/**
 * Schema for an array of persons.
 */
export const PersonArraySchema = z.array(PersonSchema, {
    required_error: "Required.",
    invalid_type_error: "Must be an array of persons.",
});

/**
 * Schema for an array of detailed persons.
 */
export const PersonDetailsArraySchema = z.array(PersonDetailsSchema, {
    required_error: "Required.",
    invalid_type_error: "Must be an array of populated persons.",
});

/**
 * Paginated persons response schema.
 */
export const PaginatedPersonsSchema =
    generatePaginationSchema(PersonSchema);

/**
 * Paginated detailed persons response schema.
 */
export const PaginatedPersonDetailsSchema =
    generatePaginationSchema(PersonDetailsSchema);
