/**
 * @file Specialized UI section for displaying a customer's movie review history.
 * @filename CustomerProfileReviewSection.tsx
 */

import {PageSectionHeader} from "@/common/components/page/PageSectionHeader.tsx";
import {
    CustomerMovieReviewSummary
} from "@/domains/review/schemas/models/customer-movie-reviews/CustomerMovieReviewSummarySchema.ts";
import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {CustomerMovieReviewSummaryCard} from "@/views/admin/customers/components/customer-reviews";

/**
 * Props for {@link CustomerProfileReviewSection}.
 */
type SectionProps = {
    /** The unique identification code of the customer owning these reviews. */
    code: UserUniqueCode;
    /** Total count of reviews authored by the user (for header display). */
    itemCount: number;
    /** List of summarized review data for rendering. */
    reviews: CustomerMovieReviewSummary[];
};

/**
 * Renders a grid of movie reviews within the Customer Profile administrative view.
 * ---
 */
export const CustomerProfileReviewSection = (
    {code, itemCount, reviews}: SectionProps
) => {
    return (
        <section className="space-y-4">
            <PageSectionHeader text={`Reviews (${itemCount})`} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {reviews.map((review) => (
                    <CustomerMovieReviewSummaryCard
                        code={code}
                        key={review._id}
                        review={review}
                    />
                ))}
            </div>
        </section>
    );
};