/**
 * @fileoverview Content layout for the admin user details page displaying profile info, reviews, and reservations.
 */

import {ReactElement} from "react";
import {PageFlexWrapper, PageHeader} from "@/views/common/_comp";
import {User} from "@/domains/users/_schema/user";
import {AdminUserDetailsCard} from "@/views/admin/users/_comp";
import {useTitle} from "@/common/_feat";
import {
    UserDetailsPageBreadcrumbs,
    UserDetailsPageRoleManagementSection, UserDetailsPageStatusManagementSection,
    UserDetailsPageSuspensionSection
} from "@/views/admin/users/pages";

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
    const {name, uniqueCode, status} = user;
    useTitle(`User • ${name}`);
    useTitle(`User Status • ${status}`);

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UserDetailsPageSuspensionSection
                    userId={user._id}
                    userStatus={status}
                />

                <UserDetailsPageRoleManagementSection
                    userId={user._id}
                    userStatus={status}
                    userRoles={user.roles}
                />

                <UserDetailsPageStatusManagementSection
                    userId={user._id}
                    userStatus={user.status}
                />
            </div>


        </PageFlexWrapper>
    );
}