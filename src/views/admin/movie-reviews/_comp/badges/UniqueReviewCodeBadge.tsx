/**
 * @fileoverview High-visibility badge component for displaying unique review identification codes.
 */

import {MovieReviewUniqueCode} from "@/domains/movie-reviews/_schema/fields";
import {Badge} from "@/common/components/ui/badge.tsx";
import {cn} from "@/common/_feat";
import {ReactElement} from "react";

/** Props for the UniqueReviewCodeBadge component. */
type BadgeProps = {
    code: MovieReviewUniqueCode;
    className?: string;
};

/** Renders a specialized badge designed for review system identifiers. */
export function UniqueReviewCodeBadge(
    {code, className}: BadgeProps
): ReactElement {
    return (
        <Badge
            variant="outline"
            className={cn(
                "select-all font-suseMono text-white dark:text-white",
                "bg-blue-600 dark:bg-blue-700",
                className
            )}
        >
            • {code}
        </Badge>
    );
}