/**
 * @fileoverview A badge component for displaying the status of a movie showing.
 */

import {ReactElement} from "react";
import {Badge} from "@/common/components/ui/badge.tsx";
import {ShowingStatus} from "@/domains/showings/schema/fields";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import {cn} from "@/common/lib/utils.ts";

/** Props for the ShowingStatusBadge component. */
type BadgeProps = {
    status: ShowingStatus;
    className?: string;
};

const CSS_CONSTANT = {
    "SCHEDULED": "bg-gray-500 text-white",
    "RUNNING": "bg-green-500 text-white",
    "COMPLETED": "bg-blue-500 text-white",
    "CANCELLED": "bg-red-500 text-white",
    "SOLD_OUT": "bg-yellow-500 text-white",
}

/** Displays a color-coded badge representing the current status of a showing. */
export function ShowingStatusBadge(
    {status, className}: BadgeProps
): ReactElement {
    const formattedStatus = convertToTitleCase(status.replace(/_/g, " "));

    return (
        <Badge className={cn(CSS_CONSTANT[status], className)}>
            {formattedStatus}
        </Badge>
    );
}