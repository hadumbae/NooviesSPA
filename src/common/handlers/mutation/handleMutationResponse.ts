/**
 * @file Legacy handler for mutation responses.
 * @filename handleMutationResponse.ts
 * * @deprecated This utility has been rendered redundant by the current implementation
 * of useMutation hooks and useFetchAPI. It is slated for removal.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";

/**
 * Parameters for {@link handleMutationResponse}.
 * ---
 * @template TReturns The expected return type of the API call.
 * @template TRaw The type of raw form data sent with the request.
 */
type FormResponseParams<TReturns = unknown, TRaw = unknown> = {
    /**
     * Function that performs the API request.
     * Must return a {@link RequestReturns} object containing the parsed result.
     */
    action: () => Promise<RequestReturns<TReturns>>;

    /**
     * Optional error message to override default messages.
     * @deprecated No longer utilized in the current simplified version.
     */
    errorMessage?: string;

    /**
     * Optional raw data associated with the request.
     * @deprecated No longer utilized in the current simplified version.
     */
    rawData?: TRaw;
};

/**
 * Handles API mutation responses for form submissions.
 * ---
 * ### Status: Redundant
 * This function previously managed complex error mapping between HTTP 400 responses
 * and `FormValidationError`. Those responsibilities have been moved to:
 * **`useFetchAPI`**: Handles raw response parsing and bad response triggers.
 * ---
 * @template TReturns The expected return type of the API call.
 * @param params - Configuration containing the asynchronous API action.
 * @returns {Promise<TReturns>} The unwrapped result from the API request.
 */
export default async function handleMutationResponse<TReturns = unknown>(
    {action}: FormResponseParams<TReturns>
): Promise<TReturns> {
    const {result} = await action();
    return result;
}