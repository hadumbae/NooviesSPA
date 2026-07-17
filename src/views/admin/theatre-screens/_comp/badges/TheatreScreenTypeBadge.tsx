/**
 * @fileoverview Badge component for displaying a theatre screen technical format.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {Badge} from "@/common/components/ui";
import {ScreenType} from "@/domains/theatre-screens";

/** Props for the TheatreScreenTypeBadge component. */
type BadgeProps = {
    type: ScreenType;
    className?: string;
};

/**
 * Renders a styled badge representing the screen type.
 */
export function TheatreScreenTypeBadge(
    {type, className}: BadgeProps
): ReactElement {
    return (
        <Badge
            className={cn("select-none bg-blue-300 dark:bg-blue-600", className)}
            variant="outline"
        >
            {type}
        </Badge>
    );
}