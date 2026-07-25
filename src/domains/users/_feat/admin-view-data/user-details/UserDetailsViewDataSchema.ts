/**
 * @fileoverview Defines the schema and type for the user details administrative view data.
 */

import {z} from "zod";
import {UserSchema} from "@/domains/users";
import {generateArraySchema} from "@/common/_feat";
import {PopulatedMovieReviewSchema} from "@/domains/movie-reviews";
import {PopulatedReservationSchema} from "@/domains/reservations";

/** Zod schema for validating the composite user details view data. */
export const UserDetailsViewDataSchema = z.object({
    user: UserSchema,
    reviews: generateArraySchema(PopulatedMovieReviewSchema),
    reservations: generateArraySchema(PopulatedReservationSchema),
});

/** Type definition inferred from UserDetailsViewDataSchema. */
export type UserDetailsViewData = z.infer<typeof UserDetailsViewDataSchema>;