/**
 * @file Zod validation schema and TypeScript type definition for the Genre entity.
 * @filename GenreSchema.ts
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {CloudinaryImageSchema} from "@/common/schema/models/cloudinary-image/CloudinaryImageSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/**
 * Core validation schema for Genre documents.
 */
export const GenreSchema = z.object({
    /** Unique MongoDB ObjectId string. */
    _id: IDStringSchema,

    /** Human-readable name of the genre. */
    name: NonEmptyStringSchema
        .min(3, "Must be 3 characters or longer.")
        .max(255, "Must be 255 characters or less."),

    /** Detailed summary explaining the genre's characteristics. */
    description: NonEmptyStringSchema
        .max(1000, "Must be 1000 characters or less."),

    /** Reference to an image hosted on Cloudinary. */
    image: CloudinaryImageSchema.nullable().readonly().optional(),

    /** SEO-friendly URL identifier. */
    slug: NonEmptyStringSchema.readonly(),

    /** Denormalized count of movies associated with this genre. */
    movieCount: NonNegativeNumberSchema,
});

/**
 * TypeScript type inferred from {@link GenreSchema}.
 */
export type Genre = z.infer<typeof GenreSchema>;