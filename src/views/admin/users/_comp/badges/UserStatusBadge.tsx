/**
 * @fileoverview Badge UI component for displaying user account status with corresponding styling.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat";
import {UserStatus} from "@/domains/users";
import {Badge} from "@/views/common/_comp/ui";

/** Props for the UserStatusBadge component. */
type BadgeProps = {
    status: UserStatus;
    className?: string;
};

const BADGE_CSS: Record<UserStatus, string> = {
    "ACTIVE": "bg-green-500 dark:bg-green-700",
    "SUSPENDED": "bg-red-500 dark:bg-red-700",
    "INACTIVE": "bg-blue-500 dark:bg-blue-700",
};

/**
 * Renders a stylised badge representing the status of a user account.
 */
export function UserStatusBadge(
    {status, className}: BadgeProps
): ReactElement {
    return (
        <Badge variant="outline" className={cn(
            "text-white border-none select-none",
            BADGE_CSS[status],
            className,
        )}>
            {status.toUpperCase()}
        </Badge>
    );
}