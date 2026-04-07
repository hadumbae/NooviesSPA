/**
 * @file Zod validation schemas for Movie Reviews and their populated variants.
 * @filename MovieReview.schema.ts
 */

import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {BooleanValueSchema} from "@/common/schema/boolean/BooleanValueSchema.ts";
import {LeanUserSchema} from "@/domains/users/schemas/user/User.schema.ts";
import {ModelTimestampsSchema} from "@/common/schema/models/ModelTimestampsSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {MovieWithGenresSchema} from "@/domains/movies/schema/movie/MovieWithGenresSchema.ts";
import {SlugStringSchema} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {MovieReviewUniqueCodeSchema} from "@/domains/review/features/codes";

/**
 * Base schema for a Movie Review using raw ObjectIDs for relational references.
 * ---
 */
export const MovieReviewSchema = ModelTimestampsSchema.extend({
    /** Unique database identifier for the review. */
    _id: IDStringSchema,

    /** Reference to the User who authored the review. */
    user: IDStringSchema,

    /** Reference to the Movie being reviewed. */
    movie: IDStringSchema,

    /** Publicly visible name of the reviewer. */
    displayName: NonEmptyStringSchema.max(100, "Must be 100 characters or less."),

    /** Detailed body text of the review. */
    reviewText: NonEmptyStringSchema.max(2000, "Must be 2000 characters or less.").optional(),

    /** Brief summary or "headline" of the user's opinion. */
    summary: NonEmptyStringSchema.max(500, "Must be 500 characters or less."),

    /** Numeric score assigned to the movie (1-5 scale). */
    rating: PositiveNumberSchema.max(5, "Must be 1-5."),

    /** Flag indicating whether the reviewer recommends the movie. */
    isRecommended: BooleanValueSchema.optional(),

    /** Visibility status for public feeds. */
    isPublic: BooleanValueSchema,

    /** URL-friendly identifier for the review page. */
    slug: SlugStringSchema,

    /** Standardized tracking code (REV-XXXXX-XXXXX). */
    uniqueCode: MovieReviewUniqueCodeSchema,
});

/**
 * Movie review schema with fully resolved relational data for both user and movie.
 * ---
 */
export const PopulatedMovieReviewSchema = MovieReviewSchema.extend({
    /** Resolved author profile information. */
    user: LeanUserSchema,

    /** Resolved movie information including genre metadata. */
    movie: MovieWithGenresSchema,
});

/**
 * Comprehensive review schema including calculated metrics and viewer-contextual flags.
 * ---
 */
export const MovieReviewDetailsSchema = PopulatedMovieReviewSchema.extend({
    /** UI flag for rendering active "Like" button states. */
    isLikedByUser: BooleanValueSchema,

    /** UI flag to determine permission-based actions (edit/delete). */
    isUserReview: BooleanValueSchema,

    /** Total number of "helpful" votes received from other users. */
    helpfulCount: NonNegativeNumberSchema,
});