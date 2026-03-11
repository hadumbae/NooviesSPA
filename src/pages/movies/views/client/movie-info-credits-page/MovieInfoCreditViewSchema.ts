/**
 * @file Schema for movie credits page view data.
 * @filename MovieInfoCreditViewSchema.ts
 */

import {z} from "zod";
import {MovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {RoleTypeCrewCategoryEnumSchema} from "@/pages/roletype/schema/enums/RoleTypeCategory.enum.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {
    CastCreditExceptMovieSchema,
    CrewCreditExceptMovieSchema
} from "@/pages/moviecredit/schemas/model/credit-except-schemas/CreditExceptMovie.schema.ts";

/**
 * View schema combining movie details with grouped cast and crew credits.
 */
export const MovieInfoCreditViewSchema = z.object({
    movie: MovieDetailsSchema,
    movieCredits: z.object({
        castCredits: generateArraySchema(CastCreditExceptMovieSchema),
        crewCredits: generateArraySchema(z.object({
            category: RoleTypeCrewCategoryEnumSchema,
            totalCredits: NonNegativeNumberSchema,
            credits: generateArraySchema(CrewCreditExceptMovieSchema),
        })),
    }),
});

/** Inferred type for movie credits page view data. */
export type MovieInfoCreditViewData = z.infer<typeof MovieInfoCreditViewSchema>;