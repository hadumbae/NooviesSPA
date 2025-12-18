/**
 * ⚡ Simplify ShowingDetails into a Showing
 *
 * Converts a populated `ShowingDetails` object into a plain `Showing`
 * by extracting referenced IDs and validating the result against
 * `ShowingSchema`.
 *
 * Throws a {@link ParseError} if the simplified payload fails schema validation.
 */

import {Showing, ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
import {ShowingSchema} from "@/pages/showings/schema/showing/Showing.schema.ts";
import {ParseError} from "@/common/errors/ParseError.ts";

/**
 * ⚡ Simplifies a populated showing into its base form.
 *
 * @param data - Fully populated showing details
 * @returns A validated, simplified {@link Showing}
 * @throws {ParseError} When schema validation fails
 */
export default function simplifyShowingDetails(data: ShowingDetails): Showing {
    const {
        movie: {_id: movie},
        theatre: {_id: theatre},
        screen: {_id: screen},
        ...rem
    } = data;


    const raw = {...rem, movie, theatre, screen};
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
