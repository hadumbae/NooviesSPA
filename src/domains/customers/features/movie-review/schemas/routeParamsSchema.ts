/**
 * @file Zod validation schema for URL parameters in customer review detail views.
 * @filename routeParamsSchema.ts
 */

import {z} from "zod";
import {UserUniqueCodeSchema} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {MovieReviewUniqueCodeSchema} from "@/domains/review/features/codes";

/**
 * Validation schema for identifying a specific review within a customer's scope via URL.
 * ---
 */
export const CustomerReviewRouteParamsSchema = z.object({
    /** The validated unique code of the review author (the customer). */
    uniqueCode: UserUniqueCodeSchema,
    /** The validated unique code of the specific review being moderated. */
    reviewCode: MovieReviewUniqueCodeSchema,
});

/**
 * TypeScript type inferred from {@link CustomerReviewRouteParamsSchema}.
 * Use this to type the output of `useParams()` in Review-related pages.
 */
export type CustomerReviewRouteParams = z.infer<typeof CustomerReviewRouteParamsSchema>;