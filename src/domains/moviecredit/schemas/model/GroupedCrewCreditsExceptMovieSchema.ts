/**
 * @fileoverview Schema for grouped crew credits used in detailed views.
 * Orchestrates the validation of crew participations categorized by production
 * department or role category, specifically excluding redundant movie relation data.
 */

import {z} from "zod";
import {RoleTypeCrewCategoryEnumSchema} from "@/domains/roletype/schema/enums/RoleTypeCategory.enum.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {CrewCreditExceptMovieSchema} from "@/domains/moviecredit/_feat/movie-info-credits/CreditExceptMovie.schema.ts";

/**
 * Schema representing crew credits grouped by role category.
 */
export const GroupedCrewCreditsExceptMovieSchema = z.object({
    category: RoleTypeCrewCategoryEnumSchema,
    totalCredits: NonNegativeNumberSchema,
    credits: generateArraySchema(CrewCreditExceptMovieSchema),
});

/**
 * Validated type for crew credits grouped by category.
 */
export type GroupedCrewCreditsExceptMovie = z.infer<typeof GroupedCrewCreditsExceptMovieSchema>;