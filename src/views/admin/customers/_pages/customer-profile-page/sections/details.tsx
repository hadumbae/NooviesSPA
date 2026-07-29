/**
 * @fileoverview Details section for the customer profile page displaying reviews and reservations.
 */

import {ReactElement} from "react";
import {PageSectionHeader} from "@/views/common/_comp";
import {PopulatedMovieReview} from "@/domains/movie-reviews";
import {Reservation} from "@/domains/reservations";
import {ObjectId} from "@/common/_schemas";
import {Separator} from "@/views/common/_comp/ui";
import {Link} from "react-router-dom";
import {
    CustomerDetailsListCard,
    CustomerReservationListSummaryItem,
    CustomerReviewListSummaryItem
} from "@/views/admin/customers";

/** Props for the CustomerProfileDetailsSection component. */
type SectionProps = {
    customerID: ObjectId;
    reviews: PopulatedMovieReview[];
    reservations: Reservation[];
    totalReviews: number;
    totalReservations: number;
};

/** Displays summary lists of a customer's recent reviews and reservations. */
export function CustomerProfileDetailsSection(
    {customerID, reservations, reviews, totalReviews, totalReservations}: SectionProps
): ReactElement {
    const reviewItems = reviews.reduce((acc, cur, i) => {
        const element = (
            <Link key={cur._id} to={`/admin/users/${customerID}/reviews/${cur._id}`}>
                <CustomerReviewListSummaryItem
                    classNames={{container: "rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-950"}}
                    review={cur}
                />
            </Link>
        );

        if (i === 0) return [element];
        return [...acc, <Separator key={`separator-${i}`}/>, element];
    }, [] as ReactElement[]);

    const reservationItems = reservations.reduce((acc, cur, i) => {
        const element = (
            <Link key={cur._id} to={`/admin/users/${customerID}/reservations/${cur._id}`}>
                <CustomerReservationListSummaryItem
                    classNames={{container: "rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-950"}}
                    reservation={cur}
                />
            </Link>
        );

        if (i === 0) return [element];
        return [...acc, <Separator key={`separator-${i}`}/>, element];
    }, [] as ReactElement[]);

    return (
        <section className="space-y-4">
            <PageSectionHeader as="h2" text="Customer Details"/>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomerDetailsListCard
                    headerText={`Reviews (${totalReviews})`}
                    viewLink={`/admin/customers/${customerID}/reviews`}
                >
                    {reviewItems}
                </CustomerDetailsListCard>

                <CustomerDetailsListCard
                    headerText={`Reservations (${totalReservations})`}
                    viewLink={`/admin/customers/${customerID}/reservations`}
                >
                    {reservationItems}
                </CustomerDetailsListCard>
            </div>
        </section>
    );
}