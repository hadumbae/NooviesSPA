/**
 * @file Schema for favourite movie status response.
 * IsFavouriteMovieSchema.ts
 */

import {z} from "zod";
import {CoercedBooleanValueSchema} from "@/common/_schemas/boolean/CoercedBooleanValueSchema.ts";
import {StringValueSchema} from "@/common/_schemas";

/** Response shape for favourite status checks. */
export const IsFavouriteMovieSchema = z.object({
    isFavourite: CoercedBooleanValueSchema,
    message: StringValueSchema.max(100, "Must be 100 characters or less"),
});

/** Inferred favourite status response type. */
export type IsFavouriteMovieMetadata = z.infer<typeof IsFavouriteMovieSchema>;