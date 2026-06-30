/**
 * @fileoverview Zod validation schema and TypeScript type definition for the Genre entity.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {CloudinaryImageSchema} from "@/common/schema/models/cloudinary-image/CloudinaryImageSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {GenreDescriptionSchema, GenreNameSchema} from "@/domains/genres/_schema/fields";

/** Zod validation schema for Genre documents. */
export const GenreSchema = z.object({
    _id: IDStringSchema.readonly(),
    name: GenreNameSchema,
    description: GenreDescriptionSchema,
    image: CloudinaryImageSchema.nullable().readonly().optional(),
    slug: NonEmptyStringSchema.readonly(),
    movieCount: NonNegativeNumberSchema,
});

/** TypeScript type inferred from GenreSchema. */
export type Genre = z.infer<typeof GenreSchema>;