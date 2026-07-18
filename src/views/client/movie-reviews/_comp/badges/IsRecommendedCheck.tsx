/**
 * @fileoverview Badge indicating a movie is recommended.
 */

import {Badge} from "@/common/components/ui/badge.tsx";
import {cn} from "@/common/_feat";
import {Check} from "lucide-react";
import {ReactElement} from "react";

/** Props for the IsRecommendedCheck component. */
type CheckProps = {
    className?: string;
    size?: number;
}

/** Displays a highlighted recommendation badge. */
export function IsRecommendedCheck(
    {className, size}: CheckProps
): ReactElement {
    return (
        <Badge variant="outline" className={cn(
            "border-yellow-500 dark:border-yellow-500",
            "p-1 rounded-full",
            className,
        )}>
            <Check size={size} className="text-yellow-500"/>
        </Badge>
    );
}