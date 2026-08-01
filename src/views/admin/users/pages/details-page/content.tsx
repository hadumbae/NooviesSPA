/**
 * @fileoverview Content layout for the admin user details page displaying profile info, reviews, and reservations.
 */

import {ReactElement} from "react";
import {PageFlexWrapper, PageHeader} from "@/views/common/_comp";
import {User} from "@/domains/users/_schema/user";
import {AdminUserDetailsCard} from "@/views/admin/users/_comp";
import {useTitle} from "@/common/_feat";
import {UserDetailsPageBreadcrumbs} from "@/views/admin/users/pages";

/** Props for the UserDetailsPageContent component. */
type ContentProps = {
    user: User;
    totalReviews: number;
    totalReservations: number;
};

/** Renders the detailed profile view for a specific user including their activity summaries. */
export function UserDetailsPageContent(
    {user, totalReviews, totalReservations}: ContentProps
): ReactElement {
    const {name, uniqueCode} = user;
    useTitle(`User • ${name}`);

    return (
        <PageFlexWrapper>
            <PageHeader
                title={name}
                description={uniqueCode}
                breadcrumbs={<UserDetailsPageBreadcrumbs userName={name} uniqueCode={uniqueCode}/>}
            />

            <AdminUserDetailsCard
                user={user}
                totalReviews={totalReviews}
                totalReservations={totalReservations}
            />
        </PageFlexWrapper>
    );
}