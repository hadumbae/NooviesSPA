import {ZodTypeAny} from "zod";
import {ParseError} from "@/common/errors/ParseError.ts";
import safeParseSchema from "@/common/utility/safeParseSchema.ts";

const parseResponseData = <
    TSchema extends ZodTypeAny,
    TData = any
>(
    {schema, data} : {schema: TSchema, data: unknown}
): TData => {
    const {data: parseData, errors} = safeParseSchema<TSchema, TData>({schema, data});

    if (errors) {
        throw new ParseError({message: "Received Invalid Data.", errors});
    }

    if (!parseData) throw new ParseError({message: "Data is unexpectedly empty.", errors: []});

    return parseData!;
}

export default parseResponseData;