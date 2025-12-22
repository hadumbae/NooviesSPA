import { z } from "zod";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { NonNegativeNumberSchema } from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import { generatePaginationSchema } from "@/common/utility/schemas/generatePaginationSchema.ts";

/**
 * @file Genre.schema.ts
 *
 * @summary
 * Zod schemas for movie genres.
 *
 * @description
 * Defines runtime validation schemas for genre-related data, including:
 * - Core genre entities
 * - Extended genre details with aggregate statistics
 * - Array and paginated variants for API responses
 *
 * These schemas provide consistent validation and type inference for
 * genre management across the application.
 */

/**
 * Core genre schema.
 *
 * @remarks
 * Represents a single genre entity with a stable identifier,
 * human-readable name, and optional descriptive text.
 */
export const GenreSchema = z.object({
    /** Unique genre identifier. */
    _id: IDStringSchema,

    /** Display name of the genre. */
    name: NonEmptyStringSchema
        .min(3, "Must be 3 characters or longer.")
        .max(255, "Must be 255 characters or less."),

    /** Optional descriptive text explaining the genre. */
    description: NonEmptyStringSchema
        .max(1000, "Must be 1000 characters or less."),
});

/**
 * Detailed genre schema.
 *
 * @remarks
 * Extends {@link GenreSchema} by including aggregate statistics.
 */
export const GenreDetailsSchema = GenreSchema.extend({
    /** Number of movies associated with this genre. */
    movieCount: NonNegativeNumberSchema,
});

/**
 * Array schema for genre entities.
 *
 * @remarks
 * Represents a list of {@link GenreSchema} objects.
 */
export const GenreArraySchema = z.array(GenreSchema);

/**
 * Paginated schema for genre entities.
 *
 * @remarks
 * Uses {@link generatePaginationSchema} with {@link GenreSchema}
 * as the item type. Intended for paginated API responses.
 */
export const PaginatedGenresSchema = generatePaginationSchema(GenreSchema);

/**
 * Paginated schema for detailed genre entities.
 *
 * @remarks
 * Uses {@link generatePaginationSchema} with {@link GenreDetailsSchema}
 * as the item type. Intended for paginated API responses that include
 * aggregate statistics.
 */
export const PaginatedGenreDetailsSchema =
    generatePaginationSchema(GenreDetailsSchema);
