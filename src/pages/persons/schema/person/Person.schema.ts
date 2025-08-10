import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {DateStringSchema} from "@/common/schema/helpers/ZodDateHelpers.ts";
import {ISO3166Alpha2CodeEnum} from "@/common/schema/enums/ISO3166Alpha2CodeEnum.ts";
import {CloudinaryImageObjectSchema} from "@/common/schema/objects/CloudinaryImageObjectSchema.ts";
import {MovieCreditSchema} from "@/pages/moviecredit/schemas/model/base/MovieCreditSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {TotalItemsNumberSchema} from "@/common/schema/numbers/TotalItemsNumberSchema.ts";

/**
 * Represents a person in the system.
 */
export const PersonSchema = z.object({
    /** Unique identifier string for the person (read-only). */
    _id: IDStringSchema.readonly(),

    /** The full name of the person. Must be 255 characters or fewer. */
    name: NonEmptyStringSchema
        .max(255, "Name must not be more than 255 characters."),

    /** A brief biography of the person, required, max 1000 characters. */
    biography: NonEmptyStringSchema
        .max(1000, "Must be 1000 characters or less."),

    /** Date of birth as an ISO 8601 date string. */
    dob: DateStringSchema,

    /** Nationality of the person as an ISO 3166-1 alpha-2 country code. */
    nationality: ISO3166Alpha2CodeEnum,

    /** Optional profile image object from Cloudinary, nullable. */
    profileImage: CloudinaryImageObjectSchema
        .nullable()
        .optional(),
});

/**
 * Represents detailed information about a person, extending `PersonSchema`.
 */
export const PersonDetailsSchema = PersonSchema.extend({
    /** Number of credits associated with the person (non-negative). */
    creditCount: NonNegativeNumberSchema,

    /** Number of movies the person has been involved with (non-negative). */
    movieCount: NonNegativeNumberSchema,

    /** Array of movie credits related to the person. */
    credits: z.array(
        z.lazy(() => MovieCreditSchema),
        {message: "Must be an array."},
    ),
});

/**
 * Represents an array of persons.
 */
export const PersonArraySchema = z.array(
    PersonSchema,
    {
        required_error: "Required.",
        invalid_type_error: "Must be an array of persons.",
    }
);

/**
 * Represents an array of detailed persons.
 */
export const PersonDetailsArraySchema = z.array(
    PersonDetailsSchema,
    {
        required_error: "Required.",
        invalid_type_error: "Must be an array of populated persons.",
    }
);

/**
 * Paginated response schema for persons.
 */
export const PaginatedPersonsSchema = z.object({
    /** Total number of persons available. */
    totalItems: TotalItemsNumberSchema,

    /** Array of persons in the current page. */
    items: z.array(z.lazy(() => PersonSchema)),
});

/**
 * Paginated response schema for detailed persons.
 */
export const PaginatedPersonDetailsSchema = z.object({
    /** Total number of detailed persons available. */
    totalItems: TotalItemsNumberSchema,

    /** Array of detailed persons in the current page. */
    items: z.array(z.lazy(() => PersonDetailsSchema)),
});