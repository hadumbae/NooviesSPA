import {z, ZodTypeAny} from "zod";

interface UnionParams<TSchema extends ZodTypeAny> {
    /**
     * The Zod schema to be combined with an empty string literal.
     */
    schema: TSchema;

    /**
     * Optional custom error message used for the union schema when validation fails.
     * Defaults to `"Invalid Type"`.
     */
    message?: string;

    /**
     * If `true`, disallows empty string values entirely.
     * Returns a required version of the schema with a `"Required."` error if the value is an empty string.
     * If `false`, transforms empty strings into `undefined`, which is useful for optional form fields.
     *
     * Defaults to `false`.
     */
    disallowEmptyString?: boolean
}

/**
 * A utility for creating Zod schemas that handle empty strings in form inputs.
 *
 * Designed for use with React Hook Form, where form fields may default to empty strings
 * but your underlying schema expects a different type (e.g., number, date, object ID).
 *
 * This function creates a union schema that accepts either an empty string (`""`) or a valid value
 * as defined by the provided schema. When `disallowEmptyString` is `false` (default),
 * it transforms `""` into `undefined` so that optional values are omitted in the final output.
 * When `disallowEmptyString` is `true`, an empty string is rejected with a "Required." message.
 *
 * @example
 * ```ts
 * const optionalNumber = unionWithEmptyString({ schema: z.number() });
 * optionalNumber.parse("")     // → undefined
 * optionalNumber.parse(42)     // → 42
 *
 * const requiredNumber = unionWithEmptyString({ schema: z.number(), disallowEmptyString: true });
 * requiredNumber.parse("")     // ❌ throws "Required."
 * requiredNumber.parse(42)     // → 42
 * ```
 *
 * @param params - An object containing the base schema, an optional error message, and whether to disallow empty strings.
 * @returns A Zod schema that accepts an empty string or the provided type, with optional refinement or transformation.
 */
export default function unionWithEmptyString<TSchema extends ZodTypeAny>(params: UnionParams<TSchema>) {
    const {schema, message = "Invalid Type", disallowEmptyString = false} = params;
    const union = z.union([z.literal(""), schema], {message});

    if (disallowEmptyString) {
        return union.refine(value => value !== "", {message: "Required."});
    }

    return union.transform(value => value === "" ? undefined : value);
}