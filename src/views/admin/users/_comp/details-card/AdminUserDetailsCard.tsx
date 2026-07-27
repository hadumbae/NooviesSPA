/**
 * @fileoverview Card component for displaying detailed user information in the admin dashboard.
 */

import {ReactElement} from "react";
import {Card, CardContent, Separator} from "@/views/common/_comp/ui";
import {User} from "@/domains/users";
import {UserUniqueCodePill} from "@/views/admin/users/_comp/pills";
import {UserRoleBadge} from "@/views/admin/users/_comp";
import {cn} from "@/common/_feat";

/** Card class names for styling the container and content. */
type CardClassNames = {
    card?: string;
    content?: string;
}

/** Props for the AdminUserDetailsCard component. */
type CardProps = {
    user: User;
    totalReviews: number;
    totalReservations: number;
    classNames?: CardClassNames;
}

/**
 * Displays a summary of user profile data including roles, unique code, and activity statistics.
 */
export function AdminUserDetailsCard(
    {user, totalReviews, totalReservations, classNames}: CardProps
): ReactElement {
    const {name, email, roles, uniqueCode} = user;

    return (
        <Card className={classNames?.card}>
            <CardContent className={cn("p-4 space-y-4", classNames?.content)}>
                <div>
                    <h2 className="primary-text text-lg font-bold">{name}</h2>
                    <h3 className="secondary-text text-sm font-bold">{email}</h3>
                </div>

                <UserUniqueCodePill uniqueCode={uniqueCode}/>

                <div className="flex flex-wrap space-x-2">
                    {roles.map(role => <UserRoleBadge key={role} role={role}/>)}
                </div>

                <Separator/>

                <div className="flex justify-start items-center space-x-5">
                    <dl className="space-y-1">
                        <dt className="primary-text text-2xl font-extrabold">{totalReviews}</dt>
                        <dd className="secondary-text text-sm font-bold">Reviews</dd>
                    </dl>

                    <dl className="space-y-1">
                        <dt className="primary-text text-2xl font-extrabold">{totalReservations}</dt>
                        <dd className="secondary-text text-sm font-bold">Reservations</dd>
                    </dl>
                </div>
            </CardContent>
        </Card>
    );
}