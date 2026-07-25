/**
 * @fileoverview Badge component for displaying user roles with color-coded backgrounds.
 */

import {ReactElement} from "react";
import {UserRole} from "@/domains/users";
import {Badge} from "@/views/common/_comp/ui";
import {cn} from "@/common/_feat";

/** Props for the UserRoleBadge component. */
type BadgeProps = {
    role: UserRole;
    className?: string;
};

const BADGE_CSS: Record<UserRole, string> = {
    "USER": "bg-green-500 dark:bg-green-700",
    "ADMIN": "bg-purple-500 dark:bg-purple-700",
};

/**
 * Renders a styled badge representing a specific user role.
 */
export function UserRoleBadge(
    {role, className}: BadgeProps
): ReactElement {
    return (
        <Badge variant="outline" className={cn(
            "text-white border-none select-none",
            BADGE_CSS[role],
            className,
        )}>
            {role.toUpperCase()}
        </Badge>
    );
}