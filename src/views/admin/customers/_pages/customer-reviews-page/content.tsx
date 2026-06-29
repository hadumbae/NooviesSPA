/**
 * @fileoverview Main content layout for the customer reviews administration page.
 */

import {PageFlexWrapper, PageSectionHeader} from "@/views/common/_comp/page";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {CustomerMovieReviewSummary} from "@/domains/movieReviews/schemas/customer-reviews";
import {LeanUserWithEmail} from "@/domains/users/schema/user";
import {CustomerMovieReviewSummaryCard} from "@/views/admin/customers/_comp";
import {CustomerReviewsPageHeader} from "@/views/admin/customers/_pages/customer-reviews-page/sections/header.tsx";
import {ReactElement} from "react";

/** Props for the CustomerReviewsPageContent component. */
type ContentProps = {
    customer: LeanUserWithEmail;
    reviews: CustomerMovieReviewSummary[];
    page: number;
    perPage: number;
    setPage: (value: number) => void;
    totalItems: number;
};

/** Renders the list of movie reviews for a specific customer with pagination controls. */
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