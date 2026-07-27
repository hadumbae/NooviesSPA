/**
 * @fileoverview Section component for displaying customer-specific data in the user details page.
 */

import {ReactElement} from "react";
import {PageSectionHeader} from "@/views/common/_comp";
import {
    AdminUserDetailsListCard,
    AdminUserReservationListSummaryItem,
    AdminUserReviewListSummaryItem
} from "@/views/admin/users/_comp";
import {PopulatedMovieReview} from "@/domains/movie-reviews";
import {PopulatedReservation} from "@/domains/reservations";
import {ObjectId} from "@/common/_schemas";
import {Separator} from "@/views/common/_comp/ui";
import {Link} from "react-router-dom";

/** Props for the UserDetailsPageCustomerSection component. */
type SectionProps = {
    userID: ObjectId;
    reviews: PopulatedMovieReview[];
    reservations: PopulatedReservation[];
    totalReviews: number;
    totalReservations: number;
};

/** Displays a summary of a customer's reviews and reservations with links to detailed lists. */
export function UserDetailsPageCustomerSection(
    {userID, reservations, reviews, totalReviews, totalReservations}: SectionProps
): ReactElement {
    const reviewItems = reviews.reduce((acc, cur, i) => {
        const element = (
            <Link key={cur._id} to={`/admin/users/${userID}/reviews/${cur._id}`}>
                <AdminUserReviewListSummaryItem
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
            <Link key={cur._id} to={`/admin/users/${userID}/reservations/${cur._id}`}>
                <AdminUserReservationListSummaryItem
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
                <AdminUserDetailsListCard
                    headerText={`Reviews (${totalReviews})`}
                    viewLink={`/admin/users/${userID}/reviews`}
                >
                    {reviewItems}
                </AdminUserDetailsListCard>

                <AdminUserDetailsListCard
                    headerText={`Reservations (${totalReservations})`}
                    viewLink={`/admin/users/${userID}/reservations`}
                >
                    {reservationItems}
                </AdminUserDetailsListCard>
            </div>
        </section>
    );
}