import {ZodTypeAny} from "zod";
import {FetchError} from "@/common/type/error/FetchError.ts";
import safeParseSchema from "@/common/utility/safeParseSchema.ts";

const parseResponseData = <
    TSchema extends ZodTypeAny,
    TData = any
>(
    {schema, data} : {schema: TSchema, data: unknown}
): TData => {
    const {data: parseData, errors} = safeParseSchema<TSchema, TData>({schema, data});

    if (errors) throw new FetchError({message: "Received Invalid Data.", errors});
    if (!parseData) throw new FetchError({message: "Data is unexpectedly empty.", errors: []});

    return parseData!;
}

export default parseResponseData;