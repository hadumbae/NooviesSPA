/**
 * @fileoverview Zod validation schema for the aggregated Customer Profile view.
 */

import {z} from "zod";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {ReservationSchema} from "@/domains/reservation/schema/model";
import {LeanUserWithEmailSchema} from "@/domains/users/schema/user";
import {CustomerMovieReviewSummarySchema} from "@/domains/movieReviews/schemas";

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