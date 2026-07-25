/**
 * @fileoverview Card component for displaying summary information of a user in the admin dashboard.
 */

import {ReactElement} from "react";
import {User} from "@/domains/users";
import {cn} from "@/common/_feat";
import {buttonVariants, Card, CardContent, Separator} from "@/views/common/_comp/ui";
import {UserRoleBadge} from "@/views/admin/users/_comp/badges/UserRoleBadge.tsx";
import {Link} from "react-router-dom";
import {Search} from "lucide-react";

/** Custom CSS class names for the UserIndexCard component. */
type CardClassNames = {
    card?: string;
    content?: string;
};

/** Props for the UserIndexCard component. */
type CardProps = {
    user: User;
    classNames?: CardClassNames;
};

/** Displays a user's name, email, unique code, and assigned roles within a card layout. */
export function UserIndexCard(
    {user, classNames}: CardProps
): ReactElement {
    return (
        <Card className={classNames?.card}>
            <CardContent className={cn("p-4 space-y-4", classNames?.content)}>
                <div>
                    <h2 className="primary-text font-bold">{user.name}</h2>
                    <h3 className="secondary-text text-sm font-bold">{user.email}</h3>
                </div>

                <Separator/>

                <div className="flex items-center space-x-2 rounded-container-border px-4 py-2">
                    <span className="secondary-text text-xs font-bold tracking-tight select-none">UNIQUE CODE</span>
                    <span className="primary-text truncate">{user.uniqueCode}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap space-x-2">
                        {user.roles.map(role => <UserRoleBadge key={role} role={role}/>)}
                    </div>

                    <Link
                        className={cn("text-with-icon", buttonVariants({size: "sm", variant: "link"}))}
                        to={`/admin/users/${user._id}`}
                    >
                        <Search/> Details
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}