// CustomerReviewsPageContent.tsx

import {LeanUserWithEmail} from "@/domains/users/schemas/user";
import {
    CustomerMovieReviewSummary
} from "@/domains/review/schemas/models/customer-movie-reviews/CustomerMovieReviewSummarySchema.ts";

type ContentProps = {
    customer: LeanUserWithEmail;
    reviews: CustomerMovieReviewSummary[];
    page: number;
    perPage: number;
    setPage: (value: number) => void;
    totalItems: number;
};

export const CustomerReviewsPageContent = (
    {}: ContentProps
) => {
    return (
        <div>
            {CustomerReviewsPageContent.name}
        </div>
    );
};