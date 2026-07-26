/**
 * @fileoverview Defines the schema and type for the user details administrative view data.
 */

import {z} from "zod";
import {generateArraySchema} from "@/common/_feat";
import {UserSchema} from "@/domains/users/_schema";
import {PopulatedMovieReviewSchema} from "@/domains/movie-reviews/_schema";
import {PopulatedReservationSchema} from "@/domains/reservations/_schema";
import {NonNegativeIntegerSchema} from "@/common/_schemas";

/** Zod schema for validating the composite user details view data. */
export const UserDetailsViewDataSchema = z.object({
    user: UserSchema,
    reviews: generateArraySchema(PopulatedMovieReviewSchema),
    reservations: generateArraySchema(PopulatedReservationSchema),
    totalReviews: NonNegativeIntegerSchema,
    totalReservations: NonNegativeIntegerSchema,
});

/** Type definition inferred from UserDetailsViewDataSchema. */
export type UserDetailsViewData = z.infer<typeof UserDetailsViewDataSchema>;