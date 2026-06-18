/**
 * @fileoverview Header component for the administrative customer review detail page.
 */

import {UserUniqueCode} from "@/domains/users/schema/fields/UserUniqueCodeSchema.ts";
import {MovieReviewUniqueCode} from "@/domains/movieReviews/schemas/fields";
import {CustomerReviewPageBreadcrumbs} from "@/views/admin/customers/customer-review-page/sections/breadcrumbs.tsx";
import {ReactElement} from "react";

/** Props for the CustomerReviewPageHeader component. */
type HeaderProps = {
    customerCode: UserUniqueCode;
    reviewCode: MovieReviewUniqueCode;
};

/** Renders the top-level identity and navigation for the review moderation view. */
export function CustomerReviewPageHeader(
    {customerCode, reviewCode}: HeaderProps
): ReactElement {
    return (
        <header className="space-y-2">
            <CustomerReviewPageBreadcrumbs
                customerCode={customerCode}
                reviewCode={reviewCode}
            />
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
}