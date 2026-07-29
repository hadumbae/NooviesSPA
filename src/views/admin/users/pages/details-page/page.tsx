/**
 * @fileoverview Page component for displaying comprehensive user details in the admin dashboard.
 */

import {ReactElement} from "react";
import {UserDetailsPageContent} from "@/views/admin/users/pages/details-page/content.tsx";
import {useFetchUserDetailsViewData, UserDetailsRouteParamsSchema} from "@/domains/users";
import {QueryDataLoader} from "@/views/common/_feat";
import {useRouteParams, useTitle} from "@/common/_feat";

/** Admin page that fetches and displays a user's profile, reservations, and reviews. */
export function UserDetailsPage(): ReactElement {
    useTitle("User Details");
    const {userID} = useRouteParams({
        schema: UserDetailsRouteParamsSchema,
        errorConfig: {description: "Valid User ID Is Required."},
    })

    const query = useFetchUserDetailsViewData({userID});

    return (
        <QueryDataLoader query={query}>
            {({user, totalReviews, totalReservations}) => (
                <UserDetailsPageContent
                    user={user}
                    totalReviews={totalReviews}
                    totalReservations={totalReservations}
                />
            )}
        </QueryDataLoader>
    );
}