/**
 * @fileoverview Refinements and validation logic for Movie-related Zod schemas.
 */

import {z} from "zod";

/**
 * Validates that a release date is provided if the movie is marked as released.
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