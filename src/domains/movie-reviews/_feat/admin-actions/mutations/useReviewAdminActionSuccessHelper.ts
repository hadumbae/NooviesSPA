/**
 * @fileoverview Higher-order success handler for administrative movie review mutations.
 *
 */
import {toast} from "react-toastify";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {CustomerProfileOverviewViewQueryKeys} from "@/domains/customers/_feat/profile-overview";
import {CustomerReviewsViewQueryKeys} from "@/domains/customers/_feat/movie-reviews";
import {CustomerReviewLogsQueryKeys} from "@/domains/customers/_feat/movie-review-logs/fetch/queryKeys.ts";

import {MovieReview} from "@/domains/movie-reviews/_schema/model";

/** Parameters extracted from the standard mutation submission interface. */
type SuccessParams = Pick<
    MutationOnSubmitParams<MovieReview>,
    "onSubmitSuccess" | "successMessage"
>;

/**
 * Generates a standardized callback for successful administrative review actions.
 */
export const useReviewAdminActionSuccessHelper = (
    {successMessage, onSubmitSuccess}: SuccessParams = {}
): (review: MovieReview) => void => {
    const invalidateQueries = useInvalidateQueryKeys();

    return (review: MovieReview) => {
        invalidateQueries([
            CustomerReviewsViewQueryKeys.all,
            CustomerReviewLogsQueryKeys.all,
            CustomerProfileOverviewViewQueryKeys.profile(),
        ], {exact: false});

        if (successMessage) {
            toast.success(successMessage);
        }

        onSubmitSuccess?.(review);
    };
};