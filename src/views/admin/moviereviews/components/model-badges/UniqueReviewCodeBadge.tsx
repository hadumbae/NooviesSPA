/**
 * @file High-visibility badge component for displaying unique review identification codes.
 * @filename UniqueReviewCodeBadge.tsx
 */

import {MovieReviewUniqueCode} from "@/domains/review/features/codes";
import {Badge} from "@/common/components/ui/badge.tsx";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for the UniqueReviewCodeBadge component.
 */
type BadgeProps = {
    /** The domain-specific unique code for a movie review. */
    code: MovieReviewUniqueCode;
    /** Optional CSS classes for custom positioning or color overrides. */
    className?: string;
};

/**
 * Renders a specialized badge designed for review system identifiers.
 * ---
 */
export const UniqueReviewCodeBadge = (
    {code, className}: BadgeProps
) => {
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
};