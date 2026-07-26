/**
 * @fileoverview Page component for displaying comprehensive user details in the admin dashboard.
 */

import {ReactElement} from "react";
import {UserDetailsPageContent} from "@/views/admin/users/pages/details-page/content.tsx";
import {useFetchUserDetailsViewData, useUserDetailsRouteParams} from "@/domains/users";
import {PageLoader} from "@/views/common/_comp";
import {QueryDataLoader} from "@/views/common/_feat";

/** Admin page that fetches and displays a user's profile, reservations, and reviews. */
export function UserDetailsPage(): ReactElement {
    const params = useUserDetailsRouteParams();

    const query = useFetchUserDetailsViewData({
        userID: params!.userID,
        reservationCount: 4,
        reviewCount: 10,
        options: {enabled: !!params?.userID}
    });

    if (!params) {
        return <PageLoader/>;
    }

    return (
        <QueryDataLoader query={query}>
            {({user, reviews, reservations, totalReviews, totalReservations}) => (
                <UserDetailsPageContent
                    user={user}
                    reviews={reviews}
                    reservations={reservations}
                    totalReviews={totalReviews}
                    totalReservations={totalReservations}
                />
            )}
        </QueryDataLoader>
    );
}