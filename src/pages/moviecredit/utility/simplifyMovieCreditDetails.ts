import { MovieCredit, MovieCreditDetails } from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import { MovieCreditSchema } from "@/pages/moviecredit/schemas/model/MovieCredit.schema.ts";
import { ParseError } from "@/common/errors/ParseError.ts";

/**
 * Simplifies a full `MovieCreditDetails` object by converting nested objects
 * (`person`, `movie`, `roleType`) into their respective `_id`s.
 *
 * Validates the simplified object using `MovieCreditSchema`. If validation fails,
 * a `ParseError` is thrown with detailed information about the failure.
 *
 * @param {MovieCreditDetails} credit - The full movie credit details object,
 *        containing nested `person`, `movie`, and `roleType` objects.
 * @returns {MovieCredit} A simplified and validated movie credit object
 *          where `person`, `movie`, and `roleType` are replaced by their `_id`s.
 * @throws {ParseError} Thrown if the simplified object does not pass schema validation.
 *
 * @example
 * const simpleCredit = simplifyMovieCreditDetails({
 *   person: { _id: "123", name: "Actor Name" },
 *   movie: { _id: "456", title: "Movie Title" },
 *   roleType: { _id: "789", name: "Lead" },
 *   ...otherProps
 * });
 */
export default function simplifyMovieCreditDetails(credit: MovieCreditDetails): MovieCredit {
    const { person, movie, roleType } = credit;

    // Convert nested objects to their _id for simplicity
    const simpleCredit = {
        ...credit,
        movie: movie._id,
        person: person._id,
        roleType: roleType._id,
    };

    // Validate the simplified credit using Zod schema
    const { data, error, success } = MovieCreditSchema.safeParse(simpleCredit);

    if (success && !error && data) return data;

    // Throw a structured ParseError if validation fails
    throw new ParseError({
        message: "Failed to simplify movie credit details.",
        errors: error.errors,
        raw: simpleCredit,
    });
}
