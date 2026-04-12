/**
 * @file Header component for the Administrative Customer Review detail page.
 * @filename CustomerReviewPageHeader.tsx
 */

import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {MovieReviewUniqueCode} from "@/domains/review/features/codes";
import {
    CustomerReviewPageBreadcrumbs
} from "@/views/admin/customers/customer-review-page/breadcrumbs.tsx";

/**
 * Props for the CustomerReviewPageHeader component.
 */
type HeaderProps = {
    /** The validated unique code of the customer (author). */
    customerCode: UserUniqueCode;
    /** The validated unique code of the movie review. */
    reviewCode: MovieReviewUniqueCode;
};

/**
 * Renders the top-level identity and navigation for the Review Moderation view.
 * ---
 */
export const CustomerReviewPageHeader = (
    {customerCode, reviewCode}: HeaderProps
) => {
    return (
        <header className="space-y-2">
            {/* Contextual navigation trail */}
            <CustomerReviewPageBreadcrumbs
                customerCode={customerCode}
                reviewCode={reviewCode}
            />

            {/* Entity Identification */}
            <div>
                <h1 className="page-title text-2xl font-bold tracking-tight">
                    Customer Review
                </h1>
                <h2 className="page-subtitle font-light text-muted-foreground">
                    {reviewCode}
                </h2>
            </div>
        </header>
    );
};