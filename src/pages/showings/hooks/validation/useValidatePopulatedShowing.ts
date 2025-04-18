import {PopulatedShowing, ShowingPopulatedSchema} from "@/pages/showings/schema/populated/ShowingPopulatedSchema.ts";
import {ParseError} from "@/common/errors/ParseError.ts";

/**
 * Validates that the provided showing object includes all required populated relations.
 *
 * @param showing - The input object expected to represent a populated showing with necessary relations.
 * @returns The validated `PopulatedShowing` instance.
 * @throws {ParseError} If the input does not conform to the `ShowingPopulatedSchema`, a `ParseError` is thrown containing validation errors.
 *
 * @example
 * ```ts
 * const validatedShowing = useValidatePopulatedShowing(rawShowing);
 * ```
 */
export default function useValidatePopulatedShowing(showing: any): PopulatedShowing {
    const result = ShowingPopulatedSchema.safeParse(showing);

    if (!result.success) {
        const message = "Invalid `Populated Showing` Data. ";
        const errors = result.error.errors;

        throw new ParseError({message, errors});
    }

    return result.data;
}