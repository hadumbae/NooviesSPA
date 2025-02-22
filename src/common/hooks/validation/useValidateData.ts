import {ZodTypeAny} from "zod";
import {ParseError} from "@/common/errors/ParseError.ts";

interface Params<TSchema extends ZodTypeAny> {
    data: unknown;
    schema: TSchema;
    isPending?: boolean;
    message?: string;
}

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