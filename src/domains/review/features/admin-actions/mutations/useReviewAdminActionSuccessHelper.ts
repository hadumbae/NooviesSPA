/**
 * @file Higher-order success handler for administrative movie review mutations.
 * @filename useReviewAdminActionSuccessHelper.ts
 */

import {MovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {toast} from "react-toastify";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {CustomerViewQueryKeys} from "@/domains/customers/features/data";

/**
 * Parameters extracted from the standard mutation submission interface.
 */
type SuccessParams = Pick<
    MutationOnSubmitParams<MovieReview>,
    "onSubmitSuccess" | "successMessage"
>;

/**
 * Generates a standardized callback for successful administrative review actions.
 * ---
 * @param params - Configuration including the success message and custom success logic.
 * @returns {Function} A specialized handler that consumes the updated {@link MovieReview}.
 */
export const useReviewAdminActionSuccessHelper = (
    {successMessage, onSubmitSuccess}: SuccessParams = {}
): (review: MovieReview) => void => {
    const invalidateQueries = useInvalidateQueryKeys();

    return (review: MovieReview) => {
        invalidateQueries([
            CustomerViewQueryKeys.profile({})
        ], {exact: false});

        if (successMessage) {
            toast.success(successMessage);
        }

        onSubmitSuccess?.(review);
    };
};