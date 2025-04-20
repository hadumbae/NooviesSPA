import {FieldValues, Path, UseFormReturn} from "react-hook-form";
import {ZodParseErrorResponse, ZodParseErrorResponseSchema} from "@/common/schema/ZodParseErrorResponseSchema.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

export default {
    validateFormErrorResponse<TFieldValues extends FieldValues>(params: {
        form: UseFormReturn<TFieldValues>,
        errorResponse: Response,
        errorData: any,
    }) {
        const {form, errorResponse, errorData} = params;

        try {
            const parsedResponse: ZodParseErrorResponse = ZodParseErrorResponseSchema.parse(errorData);
            const {errors} = parsedResponse;

            errors.forEach((error) => {
                const {path, message} = error;
                form.setError(path.join(".") as Path<TFieldValues>, {message});
            });
        } catch (e: any) {
            throw new HttpResponseError({
                response: errorResponse,
                message: "An error occurred in processing form-related errors."
            })
        }
    }
}