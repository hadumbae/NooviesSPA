import {ZodParseErrorResponseSchema} from "@/common/schema/ZodParseErrorResponseSchema.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {ParseError} from "@/common/errors/ParseError.ts";
import {ZodIssue} from "zod";

export default {
    validateFormErrorResponse(params: {
        errorResponse: Response,
        errorData: any,
    }) {
        const {errorResponse, errorData} = params;
        let parseResult = ZodParseErrorResponseSchema.safeParse(errorData);

        if (!parseResult.success) {
            throw new HttpResponseError({
                response: errorResponse,
                message: "An error occurred in processing form-related errors."
            });
        }

        const {data: errorReturns} = parseResult;
        throw new ParseError({errors: errorReturns.errors as ZodIssue[]});
    }
}