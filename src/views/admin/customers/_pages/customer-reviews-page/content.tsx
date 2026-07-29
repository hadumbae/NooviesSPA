/**
 * @fileoverview Main content layout for the customer reviews administration page.
 */

import {PageFlexWrapper, PageSectionHeader} from "@/views/common/_comp/page";
import {PageHeader, PaginationRangeButtons} from "@/views/common/_comp";
import {CustomerMovieReviewSummary} from "@/domains/movie-reviews/_schema/customer-reviews";
import {LeanUserWithEmail} from "@/domains/users/_schema/user";
import {CustomerDetailsCard, CustomerMovieReviewSummaryCard} from "@/views/admin/customers/_comp";
import {ReactElement} from "react";
import {CustomerReviewsPageBreadcrumbs} from "@/views/admin/customers/_pages/customer-reviews-page/sections";

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
    const {
        _id: customerID,
        uniqueCode: customerCode,
        name: customerName,
    } = customer;

    return (
        <PageFlexWrapper>
            <PageHeader
                title="All Customer Reviews"
                subtitle={<>
                    {customerName} • <span className="font-medium">{customerCode}</span>
                </>}
                breadcrumbs={
                    <CustomerReviewsPageBreadcrumbs
                        customerID={customerID}
                        customerName={customerName}
                        customerCode={customerCode}
                    />
                }
            />

            <CustomerDetailsCard
                customer={customer}
            />

            <section className="space-y-2">
                <PageSectionHeader>Reviews</PageSectionHeader>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {
                        reviews.map(review => (
                            <CustomerMovieReviewSummaryCard
                                key={review._id}
                                customerID={customer._id}
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