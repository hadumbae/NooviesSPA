/**
 * @fileoverview Utility for normalizing populated theatre screen entities into a flat schema.
 */

import {ParseError} from "@/common/errors/ParseError.ts";
import {
    PopulatedTheatreScreen,
    TheatreScreen,
    TheatreScreenDetails,
    TheatreScreenSchema, TheatreScreenWithVirtuals
} from "@/domains/theatre-screens/schema/model";

/**
 * Normalizes complex screen objects into a flat structure by extracting the theatre ID.
 */
export function simplifyScreenDetails(
    {theatre, ...rem}: TheatreScreen | PopulatedTheatreScreen | TheatreScreenWithVirtuals | TheatreScreenDetails
): TheatreScreen {
    const raw = {
        ...rem,
        theatre: typeof theatre === "string"
            ? theatre
            : theatre._id
    };

    const {success, error, data} = TheatreScreenSchema.safeParse(raw);

    if (!success) {
        throw new ParseError({
            message: "Failed to simplify screen details. Invalid values.",
            raw,
            errors: error?.errors,
        });
    }

    return data;
}