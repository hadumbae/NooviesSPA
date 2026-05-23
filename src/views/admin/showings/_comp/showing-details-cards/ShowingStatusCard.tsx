/**
 * @fileoverview Card component displaying the status and configuration flags of a showing.
 */

import {ReactElement} from "react";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Showing, ShowingDetails} from "@/domains/showings/schema/showing";
import {ShowingIsActiveBadge, ShowingSpecialEventBadge, ShowingStatusBadge} from "@/views/admin/showings/_comp/badges";
import {CardClassNames} from "@/common/types/card";
import {cn} from "@/common/lib/utils.ts";

/** Props for the ShowingStatusCard component. */
type CardProps = {
    showing: Showing | ShowingDetails;
    classNames?: CardClassNames;
};

/** Displays status badges for a showing including its active state and special event status. */
export function ShowingStatusCard(
    {showing, classNames}: CardProps
): ReactElement {
    const {status, config: {isActive, isSpecialEvent}} = showing;

    return (
        <Card className={classNames?.card}>
            <CardContent className={cn(
                "p-4 h-full flex justify-center items-center space-x-2",
                classNames?.content,
            )}>
                <ShowingStatusBadge status={status}/>
                <ShowingIsActiveBadge isActive={isActive}/>
                <ShowingSpecialEventBadge isSpecialEvent={isSpecialEvent}/>
            </CardContent>
        </Card>
    );
}