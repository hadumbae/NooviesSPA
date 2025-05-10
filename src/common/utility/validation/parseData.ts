import {ZodTypeAny, infer as zInfer} from "zod";
import {ParseError} from "@/common/errors/ParseError.ts";

/**
 * Parameters for {@link parseData}.
 *
 * @template TSchema
 *   The Zod schema type describing the expected shape of `data`.
 */
interface parseParams<TSchema extends ZodTypeAny> {
    /**
     * The raw value to be validated and parsed. Treated as `unknown` to enforce explicit type‑guarding.
     */
    data: unknown;
    /**
     * A Zod schema instance (e.g. `z.object({...})`) used to validate `data`.
     */
    schema: TSchema;
    /**
     * Optional custom message to attach to the thrown {@link ParseError} on validation failure.
     */
    errorMessage?: string;
}

/**
 * Validate and parse raw input through a Zod schema, returning the inferred TypeScript type.
 *
 * @template TSchema
 *   A subtype of ZodTypeAny (e.g. the return type of `z.object()`, `z.array()`, etc.).
 * @param params
 *   An object containing:
 *   - `data`: the raw value to validate
 *   - `schema`: the Zod schema to apply
 *   - `errorMessage` (optional): custom error text
 * @returns
 *   The parsed value, typed as `z.infer<TSchema>` (i.e., the TypeScript representation of `schema`).
 * @throws {ParseError}
 *   When `schema.safeParse(data)` yields `success === false`.
 *   The thrown error includes:
 *   - `errors`: an array of Zod issues (`issue.path`, `issue.message`, etc.)
 *   - `raw`: the original `data` payload for debugging
 *   - `message`: your `errorMessage` or `"Invalid data."`
 */
export default function parseData<TSchema extends ZodTypeAny>(params: parseParams<TSchema>): zInfer<TSchema> {
    const {data, schema, errorMessage} = params;
    const {success, error, data: parsedData} = schema.safeParse(data);

    if (!success) {
        throw new ParseError({
            errors: error?.issues,
            raw: data,
            message: errorMessage ?? "Invalid Data.",
        });
    }

    return parsedData;
}