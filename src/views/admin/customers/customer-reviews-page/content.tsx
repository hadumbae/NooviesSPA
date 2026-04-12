/**
 * @fileoverview Defines the content layout for the Customer Reviews page.
 */

import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import {PageSectionHeader} from "@/common/components/page/PageSectionHeader.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {CustomerMovieReviewSummary} from "@/domains/review/schemas/models/customer-movie-reviews/CustomerMovieReviewSummarySchema.ts";
import {LeanUserWithEmail} from "@/domains/users/schemas/user";
import {CustomerMovieReviewSummaryCard} from "@/views/admin/customers/_comp";
import {CustomerReviewsPageHeader} from "@/views/admin/customers/customer-reviews-page/headers/CustomerReviewsPageHeader.tsx";
import {ReactElement} from "react";

/** Properties for the CustomerReviewsPageContent component. */
type ContentProps = {
    /** The customer object containing profile and identification data. */
    customer: LeanUserWithEmail;
    /** The list of movie review summaries to display. */
    reviews: CustomerMovieReviewSummary[];
    /** The current active page number. */
    page: number;
    /** The number of items to display per page. */
    perPage: number;
    /** Callback function to update the current page. */
    setPage: (value: number) => void;
    /** The total number of items available across all pages. */
    totalItems: number;
};

/**
 * Renders the primary UI structure for the customer reviews view, including
 * a header, a responsive grid of reviews, and pagination navigation.
 */
export function CustomerReviewsPageContent(
    {customer, reviews, page, perPage, setPage, totalItems}: ContentProps
): ReactElement {
    const {uniqueCode: customerCode} = customer;

    return (
        <PageFlexWrapper>
            <CustomerReviewsPageHeader
                customerCode={customerCode}
            />

            <section className="space-y-2">
                <PageSectionHeader>Reviews</PageSectionHeader>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {
                        reviews.map(review => (
                            <CustomerMovieReviewSummaryCard
                                key={review._id}
                                code={customerCode}
                                review={review}
                            />
                        ))
                    }
                </div>
            </section>

            <PaginationRangeButtons
                page={page}
                perPage={perPage}
                totalItems={totalItems}
                setPage={setPage}
            />
        </PageFlexWrapper>
    );
}