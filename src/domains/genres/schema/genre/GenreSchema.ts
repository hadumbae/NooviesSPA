/**
 * @fileoverview Zod validation schema and TypeScript type definition for the Genre entity.
 * Defines the core data structure for genres used across the application,
 * including metadata for SEO and denormalized counters.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {CloudinaryImageSchema} from "@/common/schema/models/cloudinary-image/CloudinaryImageSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/**
 * Core validation schema for Genre documents.
 * Ensures data integrity for genre creation, updates, and API responses.
 */
export const GenreSchema = z.object({
    _id: IDStringSchema.readonly(),
    name: NonEmptyStringSchema.min(3, "Must be 3 characters or longer.").max(255, "Must be 255 characters or less."),
    description: NonEmptyStringSchema.max(1000, "Must be 1000 characters or less."),
    image: CloudinaryImageSchema.nullable().readonly().optional(),
    slug: NonEmptyStringSchema.readonly(),
    movieCount: NonNegativeNumberSchema,
});

/**
 * TypeScript type inferred from {@link GenreSchema}.
 */
export type Genre = z.infer<typeof GenreSchema>;