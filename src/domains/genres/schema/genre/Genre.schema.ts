import { z } from "zod";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { NonNegativeNumberSchema } from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import { generatePaginationSchema } from "@/common/utility/schemas/generatePaginationSchema.ts";
import { CloudinaryImageSchema } from "@/common/schema/models/cloudinary-image/CloudinaryImageSchema.ts";

/**
 * @file Genre.schema.ts
 *
 * Zod schemas for genre-related API data.
 *
 * Includes:
 * - Core genre entities
 * - Extended genre details with aggregates
 * - Array and paginated response variants
 */
export const GenreSchema = z.object({
    /** Unique genre identifier. */
    _id: IDStringSchema,

    /** Human-readable genre name. */
    name: NonEmptyStringSchema
        .min(3, "Must be 3 characters or longer.")
        .max(255, "Must be 255 characters or less."),

    /** Optional genre description. */
    description: NonEmptyStringSchema
        .max(1000, "Must be 1000 characters or less."),

    /** Optional associated image. */
    image: CloudinaryImageSchema.nullable().readonly().optional(),

    /** URL-safe identifier derived from the name. */
    slug: NonEmptyStringSchema.readonly(),
});

/**
 * Genre schema with aggregate statistics.
 */
export const GenreDetailsSchema = GenreSchema.extend({
    /** Number of movies assigned to this genre. */
    movieCount: NonNegativeNumberSchema,
});

/**
 * Array schema of genres.
 */
export const GenreArraySchema = z.array(GenreSchema);

/**
 * Paginated genre response schema.
 */
export const PaginatedGenresSchema = generatePaginationSchema(GenreSchema);

/**
 * Paginated detailed genre response schema.
 */
export const PaginatedGenreDetailsSchema =
    generatePaginationSchema(GenreDetailsSchema);
