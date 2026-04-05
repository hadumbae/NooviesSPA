/**
 * @file Badge indicating a movie is recommended.
 * @filename IsRecommendedBadge.tsx
 */

import {Badge} from "@/common/components/ui/badge.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Check} from "lucide-react";

type CheckProps = {
    className?: string;
    size?: number;
}

/**
 * Displays a highlighted recommendation badge.
 */
export const IsRecommendedCheck = ({className, size}: CheckProps) => {
    return (
        <Badge variant="outline" className={cn(
            "border-yellow-500 dark:border-yellow-500",
            "p-1 rounded-full",
            className,
        )}>
            <Check size={size} className="text-yellow-500" />
        </Badge>
    );
};