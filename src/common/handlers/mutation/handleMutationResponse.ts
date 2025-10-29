import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {ZodIssue} from "zod";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {FormValidationError} from "@/common/errors/FormValidationError.ts";
import {ValidationErrorResponseSchema} from "@/common/schema/features/failed-response/ValidationErrorResponseSchema.ts";

/**
 * Parameters for {@link handleMutationResponse}.
 *
 * @template TReturns The expected return type of the API call.
 * @template TRaw The type of raw form data sent with the request.
 */
type FormResponseParams<TReturns = unknown, TRaw = unknown> = {
    /**
     * Function that performs the API request.
     * Must return a {@link RequestReturns} object containing both
     * the raw `Response` and the parsed result.
     */
    action: () => Promise<RequestReturns<TReturns>>;

    /**
     * Optional error message to override default messages.
     */
    errorMessage?: string;

    /**
     * Optional raw data associated with the request, which will
     * be included in the {@link FormValidationError} if thrown.
     */
    rawData?: TRaw;
};

/**
 * Handles API mutation responses for form submissions.
 *
 * - Executes the provided `action()` function to make the request.
 * - On non-OK HTTP responses:
 *   - If `400 Bad Request`:
 *     - Parses the error response with {@link ValidationErrorResponseSchema}.
 *     - Throws a {@link FormValidationError} containing `ZodIssue[]` and raw data.
 *   - For all other errors:
 *     - Throws an {@link HttpResponseError}.
 * - Returns the parsed result on success.
 *
 * This is designed to integrate with React Query and `react-hook-form`
 * where `FormValidationError` maps directly to field errors.
 *
 * @template TReturns The expected return type of the API call.
 * @template TRaw The type of raw form data.
 *
 * @param params Parameters including the API action, optional error message, and optional raw form data.
 *
 * @throws {FormValidationError} When a 400 validation error occurs.
 * @throws {HttpResponseError} For other HTTP errors.
 * @throws {Error} When the error response structure is invalid.
 *
 * @returns The parsed result from the API request.
 */
export default async function handleMutationResponse<TReturns = unknown>(params: FormResponseParams<TReturns>) {
    const { action, errorMessage, rawData } = params;

    const {response, result} = await action();

    if (!response.ok) {
        const message = errorMessage || "Submitting data failed. Please try again.";

        if (response.status === 422) {
            const {success, data: parsedResult} = ValidationErrorResponseSchema.safeParse(result);
            if (!success) throw new Error("Submitting data failed. Invalid Error Response.");

            const {message: parsedMessage = "Bad Request", errors} = parsedResult;

            throw new FormValidationError({
                message: message ?? parsedMessage,
                errors: errors as ZodIssue[],
                raw: rawData,
            });
        }

        throw new HttpResponseError({message, response});
    }

    return result;
}