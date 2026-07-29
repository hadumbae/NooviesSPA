/**
 * @fileoverview Defines the Zod validation schema and TypeScript type for paginated customer review moderation logs.
 */

import {z} from "zod"
import {generatePaginationSchema} from "@/common/_feat/validation-builders"
import {MovieReviewModerationLogSchema} from "@/domains/movie-reviews/_feat/moderation/schema"
import {UserSchema} from "@/domains/users";
import {PopulatedMovieReviewSchema} from "@/domains/movie-reviews";

/** Validation schema for a paginated collection of movie review moderation log entries. */
export const CustomerReviewLogsViewDataSchema = z.object({
    customer: UserSchema,
    review: PopulatedMovieReviewSchema,
    logs: generatePaginationSchema(MovieReviewModerationLogSchema),
});

/** Represents the paginated data structure for customer review moderation logs. */
export type CustomerReviewLogsViewData = z.infer<typeof CustomerReviewLogsViewDataSchema>