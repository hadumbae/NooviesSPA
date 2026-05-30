/**
 * @fileoverview Badge component for displaying a movie rating with stars and a numeric label.
 */

import {Badge} from "@/common/components/ui/badge.tsx";
import {MovieReviewRatingStars} from "@/views/client/movie-reviews/_comp/display/MovieReviewRatingStars.tsx";
import SecondarySpan from "@/views/common/_comp/text/SecondarySpan.tsx";
import {cn} from "@/common/lib/utils.ts";
import {ReactElement} from "react";

/**
 * Props for the MovieRatingBadge component.
 */
type Props = {
    rating: number;
    className?: string;
};

/** Renders a stylized badge containing a star-based visualization and a text ratio. */
export function MovieRatingBadge({rating, className}: Props): ReactElement {
    const floorRating = Math.floor(rating);

    return (
        <Badge variant="outline" className={cn("w-fit space-x-2 py-1 px-2.5 dark:border-neutral-600", className)}>
            <MovieReviewRatingStars rating={floorRating} size="15"/>
            <SecondarySpan className="select-none font-medium" text={`${floorRating} / 5`}/>
        </Badge>
    );
}