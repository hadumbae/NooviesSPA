/**
 * @file Reusable stat component for displaying labeled data points within an admin card.
 * @filename AdminMovieWithRatingCardStat.tsx
 */

import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import PrimarySpan from "@/views/common/components/text/PrimarySpan.tsx";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for the AdminMovieWithRatingCardStat component.
 */
type StatProps = {
    /** The descriptive label for the data point (e.g., "Genres", "Runtime"). */
    label: string;
    /** The actual value/text to be displayed for the statistic. */
    text: string;
    /** Optional CSS classes for container spacing or alignment. */
    className?: string;
};

/**
 * A specialized layout component that pairs a label with a primary-styled value.
 * ---
 */
export const AdminMovieWithRatingCardStat = (
    {label, text, className}: StatProps
) => {
    return (
        <div className={cn("px-2", className)}>
            <LabeledGroup
                label={label}
                orientation="vertical"
            >
                {/* The primary data point value */}
                <PrimarySpan className="line-clamp-1 font-semibold text-sm md:text-base">
                    {text}
                </PrimarySpan>
            </LabeledGroup>
        </div>
    );
};