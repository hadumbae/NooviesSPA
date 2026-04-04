/**
 * @file Zod validation schema for the Customer Profile view aggregation.
 * @filename CustomerProfileViewDataSchema.ts
 */

import {z} from "zod";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {MovieReviewSchema} from "@/domains/review/schemas/models/MovieReview.schema.ts";
import {MovieWithGenresSchema} from "@/domains/movies/schema/movie/MovieWithGenresSchema.ts";
import {ReservationSchema} from "@/domains/reservation/schema/model";
import {LeanUserSchema} from "@/domains/users/schemas/user";

/**
 * Schema for the reservation subset of the profile view.
 * ---
 */
const ResSchema = z.object({
    /** Total count of reservations for UI pagination/badges. */
    total: NonNegativeNumberSchema,
    /** Array of validated reservation documents. */
    items: z.array(ReservationSchema),
});

/**
 * Schema for the review subset of the profile view.
 */
const RevSchema = z.object({
    /** Total count of reviews submitted by the user. */
    total: NonNegativeNumberSchema,
    /** Array of reviews with hydrated movie and genre details. */
    items: z.array(MovieReviewSchema.extend({movie: MovieWithGenresSchema})),
});

/**
 * Primary validation schema for the aggregated Customer Profile View.
 * ---
 */
export const CustomerProfileViewDataSchema = z.object({
    /** Basic user profile information. */
    customer: LeanUserSchema,
    /** Transactional history summary. */
    reservation: ResSchema,
    /** Engagement and feedback history summary. */
    review: RevSchema,
});

/** * TypeScript type inferred from the {@link CustomerProfileViewDataSchema}.
 * Represents the structured data used by the Profile Overview components.
 */
export type CustomerProfileViewData = z.infer<typeof CustomerProfileViewDataSchema>;