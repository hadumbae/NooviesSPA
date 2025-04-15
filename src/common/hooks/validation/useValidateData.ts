import {ZodTypeAny} from "zod";
import {ParseError} from "@/common/errors/ParseError.ts";

interface Params<TSchema extends ZodTypeAny> {
    data: unknown;
    schema: TSchema;
    isPending?: boolean;
    message?: string;
}

/**
 * Validates unknown data against a provided Zod schema and returns the parsed result.
 *
 * @typeParam TSchema - A Zod schema used for validation.
 * @typeParam TReturn - The expected return type after successful validation.
 *
 * @param params - An object containing:
 * - `data`: The unknown data to validate.
 * - `schema`: The Zod schema to validate against.
 * - `isPending` (optional): A flag indicating if the data is still loading; if true, validation is skipped.
 * - `message` (optional): A custom error message to use if validation fails.
 *
 * @returns The validated and parsed data as `TReturn` if validation succeeds; otherwise, returns `null` if `data` is falsy or `isPending` is true.
 *
 * @throws {@link ParseError} If validation fails, throws a `ParseError` containing the validation errors.
 */
export default function useValidateData<TSchema extends ZodTypeAny, TReturn>(params: Params<TSchema>): TReturn | null {
    const {data, schema, isPending, message} = params;
    if (!data || isPending) return null;

    const result = schema.safeParse(data);

    if (!result.success) {
        const errorMessage = "Invalid Data.";
        const errors = result.error.errors;

        throw new ParseError({message: message || errorMessage, errors});
    }

    return result.data as TReturn;
}

// http://localhost:3000/admin/showings/get/679e5e1990f92f78e185bc86/seating
// http://localhost:3000/admin/showings/get/6789271603a6405ee63710f9/seating