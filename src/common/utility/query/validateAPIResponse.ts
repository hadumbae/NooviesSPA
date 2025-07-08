import {z, ZodTypeAny} from "zod";
import {ParseError} from "@/common/errors/ParseError.ts";

type ValidationParams<TData = unknown, TSchema extends ZodTypeAny = ZodTypeAny> = {
    schema?: TSchema;
    data: TData;
    errorMessage?: string;
};

type ValidationReturns<TData> = {
    success: true;
    data: TData;
    error: null;
} | {
    success?: false;
    data: null;
    error: Error | null;
};

export default function validateAPIResponse<TData = unknown, TSchema extends ZodTypeAny = ZodTypeAny>(
    params: ValidationParams<TData, TSchema>,
): ValidationReturns<z.infer<TSchema>> {
    const {schema, data, errorMessage} = params;

    if (!schema) {
        return {
            success: true,
            data,
            error: null,
        };
    }

    const {success, data: parsedData, error} = schema.safeParse(data);

    if (success) {
        return {
            success: true,
            data: parsedData,
            error: null,
        };
    }

    return {
        success: false,
        data: null,
        error: new ParseError({
            message: errorMessage ?? "Invalid Data",
            errors: error?.errors
        }),
    }
}