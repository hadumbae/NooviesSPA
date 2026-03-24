/**
 * @file simplifyScreenDetails.ts
 * @summary
 * Normalizes a `ScreenDetails` object into a valid `Screen` shape by
 * extracting the theatre ID and validating the result through `ScreenSchema`.
 */

import {ParseError} from "@/common/errors/ParseError.ts";
import {TheatreScreen, TheatreScreenDetails, TheatreScreenSchema} from "@/domains/theatre-screens/schema/model";

/**
 * Simplifies a `ScreenDetails` record into a `Screen` by flattening
 * nested theatre information and validating the structure.
 *
 * @param screen - Full screen details, typically retrieved from the server.
 * @returns A validated `Screen` object.
 * @throws {ParseError} When the simplified data does not conform to `ScreenSchema`.
 */
export default function simplifyScreenDetails(screen: TheatreScreenDetails): TheatreScreen {
    const {theatre: {_id: theatre}, ...rem} = screen;

    const raw = {...rem, theatre};
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
