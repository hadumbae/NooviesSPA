import { z } from "zod";
import { IDStringSchema } from "@/common/schema/strings/IDStringSchema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/NonEmptyStringSchema.ts";
import { ISO3166Alpha2CodeEnum } from "@/common/schema/enums/ISO3166Alpha2CodeEnum.ts";
import { CloudinaryImageObjectSchema } from "@/common/schema/objects/CloudinaryImageObjectSchema.ts";
import { NonNegativeNumberSchema } from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import { ParsedUTCDayOnlyDateStringSchema } from "@/common/schema/dates/ParsedUTCDayOnlyDateStringSchema.ts";
import { generatePaginationSchema } from "@/common/schema/helpers/zodHelperFunctions.ts";

/**
 * Represents a person in the system.
 *
 * @remarks
 * - Core schema for a person entity.
 * - Can be used for forms, API requests, or responses.
 */
export const PersonSchema = z.object({
    /** Unique identifier string for the person (read-only). */
    _id: IDStringSchema.readonly(),

    /** The full name of the person. Must be 255 characters or fewer. */
    name: NonEmptyStringSchema.max(255, "Name must not be more than 255 characters."),

    /** A brief biography of the person, required, max 1000 characters. */
    biography: NonEmptyStringSchema.max(1000, "Must be 1000 characters or less."),

    /** Date of birth as an ISO 8601 date string (UTC, day-only). */
    dob: ParsedUTCDayOnlyDateStringSchema,

    /** Nationality of the person as an ISO 3166-1 alpha-2 country code. */
    nationality: ISO3166Alpha2CodeEnum,

    /** Optional profile image object from Cloudinary; nullable if no image exists. */
    profileImage: CloudinaryImageObjectSchema.nullable().optional(),
});

/**
 * Extends `PersonSchema` with detailed counts for associated movies and credits.
 *
 * @remarks
 * - Useful for detailed views in UI or API responses.
 */
export const PersonDetailsSchema = PersonSchema.extend({
    /** Number of credits associated with the person (non-negative). */
    creditCount: NonNegativeNumberSchema,

    /** Number of movies the person has been involved with (non-negative). */
    movieCount: NonNegativeNumberSchema,
});

/**
 * Schema representing an array of persons.
 *
 * @remarks
 * - Provides type validation for lists of `PersonSchema`.
 */
export const PersonArraySchema = z.array(PersonSchema, {
    required_error: "Required.",
    invalid_type_error: "Must be an array of persons.",
});

/**
 * Schema representing an array of detailed persons.
 *
 * @remarks
 * - Provides type validation for lists of `PersonDetailsSchema`.
 */
export const PersonDetailsArraySchema = z.array(PersonDetailsSchema, {
    required_error: "Required.",
    invalid_type_error: "Must be an array of populated persons.",
});

/**
 * Paginated response schema for persons.
 *
 * @remarks
 * - Wraps `PersonSchema` in a standard pagination structure.
 */
export const PaginatedPersonsSchema = generatePaginationSchema(PersonSchema);

/**
 * Paginated response schema for detailed persons.
 *
 * @remarks
 * - Wraps `PersonDetailsSchema` in a standard pagination structure.
 */
export const PaginatedPersonDetailsSchema = generatePaginationSchema(PersonDetailsSchema);
