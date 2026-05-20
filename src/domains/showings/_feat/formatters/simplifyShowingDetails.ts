/**
 * @fileoverview Formatter that transforms a detailed showing object into a simplified showing structure.
 */

import {ParseError} from "@/common/errors/ParseError.ts";
import {Showing, ShowingSchema} from "@/domains/showings/schema/showing/ShowingSchema.ts";
import {ShowingDetails} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";

/** Extracts IDs from nested entities to create a flat showing object and validates it against the schema. */
export function simplifyShowingDetails(data: ShowingDetails): Showing {
    const raw = {
        ...data,
        movie: data.movie._id,
        theatre: data.theatre._id,
        screen: data.screen._id,
    };

    const {data: showing, success, error} = ShowingSchema.safeParse(raw);

    if (!success) {
        const {errors} = error;

        throw new ParseError({
            raw,
            errors,
            message: "Unable to simplify showing. Please try again.",
        });
    }

    return showing;
}
