/**
 * @fileoverview Zod schema and inferred type for admin dashboard analytics view data.
 */

import {z} from "zod";
import {NonNegativeIntegerSchema} from "@/common/_schemas";

/** Schema for validating aggregated count metrics displayed on the admin dashboard. */
export const AdminDashboardViewDataSchema = z.object({
    genres: NonNegativeIntegerSchema,
    persons: NonNegativeIntegerSchema,
    theatres: NonNegativeIntegerSchema,
    movies: NonNegativeIntegerSchema,
    showings: NonNegativeIntegerSchema,
    activeShowings: NonNegativeIntegerSchema,
    reservations: NonNegativeIntegerSchema,
    activeReservations: NonNegativeIntegerSchema,
    roleTypes: NonNegativeIntegerSchema,
    movieReviews: NonNegativeIntegerSchema,
    publicMovieReviews: NonNegativeIntegerSchema,
});

/** Inferred type representing validated admin dashboard view metrics. */
export type AdminDashboardViewData = z.infer<typeof AdminDashboardViewDataSchema>;