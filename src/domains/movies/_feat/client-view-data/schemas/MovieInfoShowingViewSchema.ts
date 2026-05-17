/**
 * @fileoverview Zod schema for the movie information and showings view data.
 */

import { z } from "zod";
import {MovieDetailsSchema} from "@/domains/movies/schema/movie";
import {PopulatedShowingSchema} from "@/domains/showings/schema/showing";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";

/** Schema for validating the composite movie and paginated showings data. */
export const MovieInfoShowingViewSchema = z.object({
    movie: MovieDetailsSchema,
    showingDetails: generatePaginationSchema(PopulatedShowingSchema),
});

/** Type definition for the movie information and showings view data. */
export type MovieInfoShowingViewData = z.infer<typeof MovieInfoShowingViewSchema>;