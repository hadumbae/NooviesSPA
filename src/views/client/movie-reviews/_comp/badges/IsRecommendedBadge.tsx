/**
 * @fileoverview Badge component indicating a movie is recommended.
 */

import {Badge} from "@/views/common/_comp/ui/badge.tsx";
import {ReactElement} from "react";

/** Displays a highlighted recommendation badge. */
export function IsRecommendedBadge(): ReactElement {
    return (
        <Badge className="bg-yellow-500 dark:bg-yellow-500">
            Recommended
        </Badge>
    );
}