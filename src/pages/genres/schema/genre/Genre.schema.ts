import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";

/**
 * **GenreBaseSchema**
 *
 * Base schema for a genre entity.
 * - `name`: Non-empty string between 3–255 characters.
 * - `description`: Non-empty string up to 1000 characters.
 */
export const GenreBaseSchema = z.object({
    name: NonEmptyStringSchema
        .min(3, "Must be 3 characters or longer.")
        .max(255, "Must be 255 characters or less."),

    description: NonEmptyStringSchema
        .max(1000, "Must be 1000 characters or less."),
});

/**
 * **GenreSchema**
 *
 * Extends `GenreBaseSchema` with:
 * - `_id`: Unique identifier string.
 */
export const GenreSchema = GenreBaseSchema.extend({
    _id: IDStringSchema,
});

/**
 * **GenreDetailsSchema**
 *
 * Extends `GenreSchema` with:
 * - `movieCount`: Non-negative number representing the count of movies in the genre.
 */
export const GenreDetailsSchema = GenreSchema.extend({
    movieCount: NonNegativeNumberSchema,
});

/**
 * **GenreArraySchema**
 *
 * Array schema for multiple `GenreSchema` objects.
 */
export const GenreArraySchema = z.array(GenreSchema);

/**
 * **PaginatedGenresSchema**
 *
 * Paginated schema for basic genre data.
 * Uses `generatePaginationSchema` with `GenreSchema` as the item type.
 */
export const PaginatedGenresSchema = generatePaginationSchema(GenreSchema);

/**
 * **PaginatedGenreDetailsSchema**
 *
 * Paginated schema for detailed genre data.
 * Uses `generatePaginationSchema` with `GenreDetailsSchema` as the item type.
 */
export const PaginatedGenreDetailsSchema = generatePaginationSchema(GenreDetailsSchema);