/**
 * @fileoverview Specialized UI section for displaying a customer's movie review history.
 */

import {PageSectionHeader} from "@/views/common/_comp/page";
import {CustomerMovieReviewSummary} from "@/domains/review/schemas/customer-reviews";
import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {CustomerMovieReviewSummaryCard} from "@/views/admin/customers/_comp";

/** Props for the CustomerProfileReviewSection component. */
type SectionProps = {
    code: UserUniqueCode;
    itemCount: number;
    reviews: CustomerMovieReviewSummary[];
};

/** Renders a grid of movie reviews within the Customer Profile administrative view. */
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