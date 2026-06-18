/**
 * @fileoverview Main content layout for the Customer Profile administrative page.
 */

import {ReactElement} from "react";
import {Reservation} from "@/domains/reservation/schema/model";
import {LeanUserWithEmail} from "@/domains/users";
import {CustomerMovieReviewSummary} from "@/domains/movieReviews";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {CustomerDetailsCard} from "@/views/admin/customers/_comp";
import {
    CustomerProfilePageHeader,
    CustomerProfileReservationSection,
    CustomerProfileReviewSection,
} from "@/views/admin/customers/customer-profile-page/sections";

/** Props for the CustomerProfilePageContent component. */
type ContentProps = {
    customer: LeanUserWithEmail;
    reservations: Reservation[];
    reviews: CustomerMovieReviewSummary[];
    reservationCount: number;
    reviewCount: number;
};

/** Orchestrates the display of customer-specific data within the Admin dashboard. */
export function CustomerProfilePageContent(
    {customer, reservations, reservationCount, reviewCount, reviews}: ContentProps
): ReactElement {
    const {name, uniqueCode} = customer;

    return (
        <PageFlexWrapper>
            <CustomerProfilePageHeader
                name={name}
                code={uniqueCode}
            />

            <CustomerDetailsCard
                customer={customer}
            />

            <CustomerProfileReservationSection
                code={uniqueCode}
                itemCount={reservationCount}
                reservations={reservations}
            />

            <CustomerProfileReviewSection
                code={uniqueCode}
                itemCount={reviewCount}
                reviews={reviews}
            />
        </PageFlexWrapper>
    );
}