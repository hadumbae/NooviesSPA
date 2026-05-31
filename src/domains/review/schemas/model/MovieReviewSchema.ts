/**
 * @fileoverview Defines the schema and type for movie review documents.
 *
 */

import {z} from "zod";
import {ModelTimestampsSchema} from "@/common/schema/models/ModelTimestampsSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {BooleanValueSchema} from "@/common/schema/boolean/BooleanValueSchema.ts";
import {SlugStringSchema} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {MovieReviewUniqueCodeSchema} from "@/domains/review/schemas/fields";

/** Zod validation schema for a movie review document. */
export const MovieReviewSchema = ModelTimestampsSchema.extend({
    _id: IDStringSchema,
    user: IDStringSchema,
    movie: IDStringSchema,
    displayName: NonEmptyStringSchema.max(100, "Must be 100 characters or less."),
    reviewText: NonEmptyStringSchema.max(2000, "Must be 2000 characters or less.").optional(),
    summary: NonEmptyStringSchema.max(500, "Must be 500 characters or less."),
    rating: PositiveNumberSchema.max(5, "Must be 1-5."),
    isRecommended: BooleanValueSchema.optional(),
    isPublic: BooleanValueSchema,
    slug: SlugStringSchema,
    uniqueCode: MovieReviewUniqueCodeSchema,
});

/** Type definition for a movie review inferred from the schema. */
export type MovieReview = z.infer<typeof MovieReviewSchema>;