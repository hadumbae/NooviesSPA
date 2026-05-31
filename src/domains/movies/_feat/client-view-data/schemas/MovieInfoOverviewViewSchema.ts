/**
 * @fileoverview Zod schema and type definition for the movie info overview view data.
 */

import {z} from "zod";
import {MovieDetailsSchema} from "@/domains/movies/schema/movie";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {MovieCreditDetailsSchema} from "@/domains/moviecredit/schemas";
import {MovieReviewSummarySchema} from "@/domains/review/_feat/fetch-by-movie";

/** Zod schema for validating the composite movie overview data. */
export const MovieInfoOverviewViewSchema = z.object({
    movie: MovieDetailsSchema,
    credits: generateArraySchema(MovieCreditDetailsSchema),
    reviewDetails: MovieReviewSummarySchema,
});

/** Type definition inferred from the MovieInfoOverviewViewDataSchema. */
export type MovieInfoOverviewViewData = z.infer<typeof MovieInfoOverviewViewSchema>;