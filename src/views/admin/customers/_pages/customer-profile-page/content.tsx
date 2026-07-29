/**
 * @fileoverview Main content layout for the Customer Profile administrative page.
 */

import {ReactElement} from "react";
import {Reservation} from "@/domains/reservations/_schema/model";
import {LeanUserWithEmail} from "@/domains/users";
import {PopulatedMovieReview} from "@/domains/movie-reviews";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {CustomerDetailsCard} from "@/views/admin/customers/_comp";
import {PageHeader} from "@/views/common/_comp";
import {
    CustomerProfileDetailsSection,
    CustomerProfilePageBreadcrumbs,
} from "@/views/admin/customers/_pages/customer-profile-page/sections";

/** Props for the CustomerProfilePageContent component. */
type ContentProps = {
    customer: LeanUserWithEmail;
    reservations: Reservation[];
    reviews: PopulatedMovieReview[];
    reservationCount: number;
    reviewCount: number;
};

/** Orchestrates the display of customer-specific data within the Admin dashboard. */
export function CustomerProfilePageContent(
    {customer, reservations, reservationCount, reviewCount, reviews}: ContentProps
): ReactElement {
    const {_id, name, uniqueCode} = customer;

    return (
        <PageFlexWrapper>
            <PageHeader
                title="Customer Profile"
                description={`${uniqueCode} | ${name}`}
                breadcrumbs={<CustomerProfilePageBreadcrumbs
                    customerName={name}
                    customerCode={uniqueCode}
                />}
            />

            <CustomerDetailsCard
                customer={customer}
            />

            <CustomerProfileDetailsSection
                customerID={_id}
                reviews={reviews}
                reservations={reservations}
                totalReviews={reviewCount}
                totalReservations={reservationCount}
            />
        </PageFlexWrapper>
    );
}