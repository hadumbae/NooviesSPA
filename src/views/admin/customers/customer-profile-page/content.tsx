/**
 * @file Main content layout for the Customer Profile administrative page.
 * @filename CustomerProfilePageContent.tsx
 */

import {Reservation} from "@/domains/reservation/schema/model";
import {LeanUserWithEmail} from "@/domains/users/schemas/user";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import {
    CustomerProfileReviewSection
} from "@/views/admin/customers/customer-profile-page/sections/CustomerProfileReviewSection.tsx";
import {
    CustomerProfileReservationSection
} from "@/views/admin/customers/customer-profile-page/sections/CustomerProfileReservationSection.tsx";
import {
    CustomerProfilePageHeader
} from "@/views/admin/customers/customer-profile-page/header.tsx";
import {
    CustomerMovieReviewSummary
} from "@/domains/review/schemas/models/customer-movie-reviews/CustomerMovieReviewSummarySchema.ts";
import {CustomerDetailsCard} from "@/views/admin/customers/_comp/CustomerDetailsCard.tsx";

/**
 * Properties for the CustomerProfilePageContent component.
 */
type ContentProps = {
    /** The hydrated user data for the customer being viewed. */
    customer: LeanUserWithEmail;

    /** List of reservation records associated with this customer. */
    reservations: Reservation[];

    /** List of summarized movie reviews authored by this customer. */
    reviews: CustomerMovieReviewSummary[];

    /** Total aggregate count of reservations for the header display. */
    reservationCount: number;

    /** Total aggregate count of reviews for the header display. */
    reviewCount: number;
};

/**
 * Orchestrates the display of customer-specific data within the Admin dashboard.
 * ---
 */
export const CustomerProfilePageContent = (
    {customer, reservations, reservationCount, reviewCount, reviews}: ContentProps
) => {
    /** Unique alphanumeric identifier for routing (e.g., USR-XXXXX) */
    const {uniqueCode: code} = customer;

    return (
        <PageFlexWrapper>
            <CustomerProfilePageHeader
                name={customer.name}
                code={customer.uniqueCode}
            />

            <CustomerDetailsCard
                customer={customer}
            />

            <CustomerProfileReservationSection
                code={code}
                itemCount={reservationCount}
                reservations={reservations}
            />

            <CustomerProfileReviewSection
                code={code}
                itemCount={reviewCount}
                reviews={reviews}
            />
        </PageFlexWrapper>
    );
};