/**
 * @file Business logic refinements for Movie-related schemas.
 * @filename MovieSchemaUtilities.ts
 */

import {z} from "zod";

/**
 * Zod refinement logic to enforce temporal data integrity for movie releases.
 * * **Constraint:** If a movie is marked as `isReleased: true`, a valid `releaseDate` must be provided.
 * **Validation Target:** Intended for use with `.superRefine()` on schemas containing both fields.
 * **Error Handling:** Injects a custom Zod issue into the `releaseDate` path if the condition is violated.
 * @param values - The object containing `isReleased` and `releaseDate`.
 * @param ctx - The Zod refinement context used to report validation errors.
 */
export const MovieReleaseDateRefinement = (values: any, ctx: z.RefinementCtx) => {
    const {releaseDate, isReleased} = values;

    if (isReleased && (releaseDate === undefined || releaseDate === null)) {
        ctx.addIssue({
            code: "custom",
            path: ["releaseDate"],
            message: "Required if released.",
        });
    }
};