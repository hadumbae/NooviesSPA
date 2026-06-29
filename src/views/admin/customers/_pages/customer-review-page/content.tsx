/**
 * @fileoverview Main content layout for the administrative Customer Review detail page.
 *
 */

import {LeanUserWithEmail} from "@/domains/users";
import {CustomerMovieReview} from "@/domains/movieReviews";
import {AdminMovieWithRatingCard, CustomerDetailsCard, CustomerMovieReviewCard} from "@/views/admin/customers/_comp";
import {PageFlexWrapper, PageSectionHeader, PageSectionHeaderLink} from "@/views/common/_comp/page";
import {ReactElement} from "react";
import {
    CustomerReviewPageActionSection,
    CustomerReviewPageHeader
} from "@/views/admin/customers/_pages/customer-review-page/sections";

/** Props for the CustomerReviewPageContent component. */
type ContentProps = {
    customer: LeanUserWithEmail;
    review: CustomerMovieReview;
};

/** Main content component for displaying a specific customer movie review and associated details. */
export function CustomerReviewPageContent(
    {customer, review}: ContentProps
): ReactElement {
    const {uniqueCode: customerCode} = customer;
    const {
        _id: reviewID,
        uniqueCode: reviewCode,
        displayName,
        rating,
        movie
    } = review;

    return (
        <PageFlexWrapper>
            <CustomerReviewPageHeader
                reviewCode={reviewCode}
                customerCode={customerCode}
            />

            <CustomerDetailsCard
                customer={customer}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <section className="space-y-2">
                    <PageSectionHeader>Movie</PageSectionHeader>
                    <AdminMovieWithRatingCard movie={movie}/>
                </section>

                <section className="space-y-2">
                    <PageSectionHeader>Review</PageSectionHeader>
                    <CustomerMovieReviewCard review={review}/>
                </section>
            </div>

            <CustomerReviewPageActionSection
                reviewID={reviewID}
                displayName={displayName}
                rating={rating}
            />

            <PageSectionHeaderLink
                text="Logs"
                to={`/admin/customers/${customerCode}/reviews/${reviewCode}/logs`}
            />
        </PageFlexWrapper>
    );
}