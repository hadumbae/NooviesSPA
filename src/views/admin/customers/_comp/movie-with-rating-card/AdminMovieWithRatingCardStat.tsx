/**
 * @fileoverview Reusable stat component for displaying labeled data points within an admin card.
 */

import {ReactElement} from "react";
import {cn} from "@/common/lib/utils.ts";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";

/** Props for the AdminMovieWithRatingCardStat component. */
type StatProps = {
    label: string;
    text: string;
    className?: string;
};

/** A specialised layout component that pairs a label with a primary-styled value. */
export function AdminMovieWithRatingCardStat(
    {label, text, className}: StatProps
): ReactElement {
    return (
        <div className={cn("px-2", className)}>
            <LabeledGroup label={label} orientation="vertical">
                <span className="primary-text line-clamp-1 font-semibold text-sm md:text-base">
                    {text}
                </span>
            </LabeledGroup>
        </div>
    );
}