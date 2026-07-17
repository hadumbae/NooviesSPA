/**
 * @fileoverview A layout component that displays a collection of status badges for a showing.
 */

import {ReactElement} from "react";
import {ShowingIsActiveBadge, ShowingSpecialEventBadge, ShowingStatusBadge} from "@/views/admin/showings/_comp/badges";
import {ShowingStatus} from "@/domains/showings/_schema/fields";
import {cn} from "@/common/_feat/handle-ui/cn.ts";

/** Props for the ShowingStateBadges component. */
export type BadgeListProps = {
    className?: string;
    status: ShowingStatus;
    isActive: boolean;
    isSpecialEvent?: boolean;
};

/** Renders a horizontal list of badges representing the current state of a showing. */
export function ShowingStateBadges(
    {className, status, isActive, isSpecialEvent}: BadgeListProps
): ReactElement {
    return (
        <div className={cn("flex items-center space-x-3", className)}>
            <ShowingStatusBadge status={status}/>
            <ShowingIsActiveBadge isActive={isActive}/>
            <ShowingSpecialEventBadge isSpecialEvent={isSpecialEvent}/>
        </div>
    );
}