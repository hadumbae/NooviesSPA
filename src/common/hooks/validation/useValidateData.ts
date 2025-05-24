import {z, ZodTypeAny} from "zod";
import {ParseError} from "@/common/errors/ParseError.ts";

interface Params<TSchema extends ZodTypeAny> {
    data: unknown;
    schema: TSchema;
    message?: string;
    isPending?: boolean;
}

interface ParseDataReturns<TReturn> {
    data: TReturn | null;
    error: Error | null;
}

export default function useValidateData<TSchema extends ZodTypeAny>(
    {data, schema, message, isPending}: Params<TSchema>
): ParseDataReturns<z.infer<TSchema>> {
    if (isPending) return {data: null, error: null};
    const {data: parsedData, success, error} = schema.safeParse(data);

    return {
        data: success ? parsedData : null,
        error: !success
            ? new ParseError({message: message || "Invalid Data.", errors: error.errors, raw: data})
            : null,
    };
}