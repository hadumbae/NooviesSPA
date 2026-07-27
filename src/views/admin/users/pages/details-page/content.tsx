/**
 * @fileoverview Content layout for the admin user details page displaying profile info, reviews, and reservations.
 */

import {ReactElement} from "react";
import {PageFlexWrapper, PageHeader} from "@/views/common/_comp";
import {User} from "@/domains/users";
import {PopulatedMovieReview} from "@/domains/movie-reviews";
import {PopulatedReservation} from "@/domains/reservations";
import {AdminUserDetailsCard} from "@/views/admin/users/_comp";
import {useTitle} from "@/common/_feat";
import {UserDetailsPageCustomerSection} from "@/views/admin/users/pages";

/** Props for the UserDetailsPageContent component. */
type ContentProps = {
    user: User;
    reviews: PopulatedMovieReview[];
    reservations: PopulatedReservation[];
    totalReviews: number;
    totalReservations: number;
};

/** Renders the detailed profile view for a specific user including their activity summaries. */
export function UserDetailsPageContent(
    {user, reviews, reservations, totalReviews, totalReservations}: ContentProps
): ReactElement {
    const {_id: userID, name, uniqueCode} = user;
    useTitle(`User • ${name}`);

    return (
        <PageFlexWrapper>
            <PageHeader title={name} description={uniqueCode}/>

            <AdminUserDetailsCard
                user={user}
                totalReviews={totalReviews}
                totalReservations={totalReservations}
            />

            <UserDetailsPageCustomerSection
                userID={userID}
                reviews={reviews}
                reservations={reservations}
                totalReservations={totalReservations}
                totalReviews={totalReviews}
            />
        </PageFlexWrapper>
    );
}