/**
 * @fileoverview Zod schema for the movie information and showings view data.
 */

import { z } from "zod";
import {MovieDetailsSchema} from "@/domains/movies/_schema/movie";
import {PopulatedShowingSchema} from "@/domains/showings/_schema/showing";
import {generatePaginationSchema} from "@/common/_feat/validation-builders";

/** Schema for validating the composite movie and paginated showings data. */
export const MovieInfoShowingViewSchema = z.object({
    movie: MovieDetailsSchema,
    showingDetails: generatePaginationSchema(PopulatedShowingSchema),
});

/** Type definition for the movie information and showings view data. */
export type MovieInfoShowingViewData = z.infer<typeof MovieInfoShowingViewSchema>;