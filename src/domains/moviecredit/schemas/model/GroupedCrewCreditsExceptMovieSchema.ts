/**
 * @fileoverview Schema and type definitions for crew credits grouped by their role category.
 */

import {z} from "zod";
import {RoleTypeCrewCategorySchema} from "@/domains/roletype/schema/fields/RoleTypeCategorySchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {CrewCreditExceptMovieSchema} from "@/domains/moviecredit/_feat/movie-info-credits/schema/CreditExceptMovieSchema.ts";

/** Zod schema for crew credits grouped by role category. */
export const GroupedCrewCreditsExceptMovieSchema = z.object({
    category: RoleTypeCrewCategorySchema,
    totalCredits: NonNegativeNumberSchema,
    credits: generateArraySchema(CrewCreditExceptMovieSchema),
});

/** Validated type for crew credits grouped by category. */
export type GroupedCrewCreditsExceptMovie = z.infer<typeof GroupedCrewCreditsExceptMovieSchema>;