/**
 * @file Utility schemas derived from movie credit models for arrays, pagination,
 * and grouped crew credit structures.
 * @filename MovieCreditRelated.schema.ts
 */

import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {MovieCreditSchema} from "@/pages/moviecredit/schemas/model/movie-credit-schema/MovieCredit.schema.ts";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {
    MovieCreditDetailsSchema
} from "@/pages/moviecredit/schemas/model/movie-credit-details-schema/MovieCreditDetails.schema.ts";
import {z} from "zod";
import {RoleTypeCrewCategoryEnumSchema} from "@/pages/roletype/schema/enums/RoleTypeCategory.enum.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {
    CrewCreditExceptMovieSchema
} from "@/pages/moviecredit/schemas/model/credit-except-schemas/CreditExceptMovie.schema.ts";

/** Pagination schema for movie credits. */
export const PaginatedMovieCreditSchema = generatePaginationSchema(MovieCreditSchema);

/** Array schema for movie credits. */
export const MovieCreditArraySchema = generateArraySchema(MovieCreditSchema);

/** Pagination schema for detailed movie credits. */
export const PaginatedMovieCreditDetailsSchema = generatePaginationSchema(MovieCreditDetailsSchema);

/** Array schema for detailed movie credits. */
export const MovieCreditDetailsArraySchema = generateArraySchema(MovieCreditDetailsSchema);

/**
 * Schema representing crew credits grouped by role category,
 * excluding movie relation details.
 */
export const GroupedCrewCreditsExceptMovieSchema = z.object({
    category: RoleTypeCrewCategoryEnumSchema,
    totalCredits: NonNegativeNumberSchema,
    credits: generateArraySchema(CrewCreditExceptMovieSchema),
});