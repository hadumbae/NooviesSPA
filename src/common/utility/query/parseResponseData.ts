import {ZodTypeAny} from "zod";
import {ParseError} from "@/common/errors/ParseError.ts";
import safeParseSchema from "@/common/utility/validation/safeParseSchema.ts";

interface Params<TSchema> {
    schema: TSchema;
    data: unknown;
}

/**
 * Validates the provided data against the given Zod schema.
 *
 * @typeParam TSchema - The Zod schema type.
 * @typeParam TData - The expected data type after parsing.
 *
 * @param params - The parameters for validation.
 * @param params.schema - The Zod schema to validate against.
 * @param params.data - The data to be validated.
 *
 * @returns The validated data conforming to the schema.
 * @throws {ParseError} If validation fails or the data is unexpectedly empty.
 */
export default <TSchema extends ZodTypeAny, TData = any>(params : Params<TSchema>): TData => {
    const {schema, data} = params;
    const {data: parseData, errors} = safeParseSchema<TSchema, TData>({schema, data});

    if (errors) {
        throw new ParseError({message: "Received Invalid Data.", errors});
    }

    if (!parseData) throw new ParseError({message: "Data is unexpectedly empty.", errors: []});

    return parseData!;
}