/**
 * @file Main content layout for the administrative Customer Review detail page.
 * @filename CustomerReviewPageContent.tsx
 */

import {LeanUserWithEmail} from "@/domains/users/schemas/user";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import {CustomerReviewPageHeader} from "@/views/admin/customers/pages/customer-review-page/headers/CustomerReviewPageHeader.tsx";
import {CustomerMovieReview} from "@/domains/review/schemas/models/customer-movie-reviews/CustomerMovieReviewSchema.ts";
import {CustomerDetailsCard} from "@/views/admin/customers/components/customer-details";
import {CustomerReviewPageActionSection} from "@/views/admin/customers/pages/customer-review-page/sections/CustomerReviewPageActionSection.tsx";
import {PageSectionHeader} from "@/common/components/page/PageSectionHeader.tsx";
import {AdminMovieWithRatingCard} from "@/views/admin/customers/features/customer-reviews/movie-rating-card";
import {CustomerMovieReviewCard} from "@/views/admin/customers/features/customer-reviews/movie-review-card";
import {PageSectionHeaderLink} from "@/common/components/page/PageSectionHeaderLink.tsx";

/**
 * Props for the CustomerReviewPageContent component.
 * ---
 */
type ContentProps = {
    /** The hydrated user object representing the author of the review. */
    customer: LeanUserWithEmail;
    /** The specific movie review data, including nested movie metadata. */
    review: CustomerMovieReview;
};

/**
 * Orchestrates the full view for administrative review moderation.
 * ---
 */
export const CustomerReviewPageContent = (
    {customer, review}: ContentProps
) => {
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
};