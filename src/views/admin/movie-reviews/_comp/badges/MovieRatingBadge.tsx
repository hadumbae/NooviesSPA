/**
 * @fileoverview Badge component for displaying a movie rating with stars and a numeric label.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat";
import {Badge} from "@/common/components/ui/badge.tsx";
import {MovieReviewRatingStars} from "@/views/client/movie-reviews/_comp/display/MovieReviewRatingStars.tsx";

/**
 * Props for the MovieRatingBadge component.
 */
type Props = {
    rating: number;
    className?: string;
};

/** Renders a stylised badge containing a star-based visualization and a text ratio. */
export function MovieRatingBadge({rating, className}: Props): ReactElement {
    const floorRating = Math.floor(rating);

    return (
        <Badge variant="outline" className={cn("w-fit space-x-2 py-1 px-2.5 dark:border-neutral-600", className)}>
            <MovieReviewRatingStars rating={floorRating} size="15"/>
            <span className="secondary-text select-none font-medium">{`${floorRating} / 5`}</span>
        </Badge>
    );
}