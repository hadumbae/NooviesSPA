/**
 * @fileoverview Zod validation schema for the aggregated Customer Profile view.
 */

import {z} from "zod";
import {ReservationSchema} from "@/domains/reservations/_schema/model";
import {LeanUserWithEmailSchema} from "@/domains/users/_schema/user";
import {CustomerMovieReviewSummarySchema} from "@/domains/movie-reviews/_schema";
import {NonNegativeNumberSchema} from "@/common/_schemas/numbers/non-negative-number/NonNegativeNumberSchema";

const ResSchema = z.object({
    total: NonNegativeNumberSchema,
    items: z.array(ReservationSchema),
});

const RevSchema = z.object({
    total: NonNegativeNumberSchema,
    items: z.array(CustomerMovieReviewSummarySchema),
});

/** Primary validation schema for the aggregated Customer Profile View. */
export const CustomerProfileViewDataSchema = z.object({
    customer: LeanUserWithEmailSchema,
    reservation: ResSchema,
    review: RevSchema,
});

/** Represents the structured data used by the Profile Overview components. */
export type CustomerProfileViewData = z.infer<typeof CustomerProfileViewDataSchema>;