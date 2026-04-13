/**
 * @file A compact badge component for displaying a movie rating with visual stars and a numeric label.
 * @filename MovieRatingBadge.tsx
 */

import {Badge} from "@/common/components/ui/badge.tsx";
import MovieReviewRatingStars from "@/views/client/movie-reviews/components/MovieReviewRatingStars.tsx";
import SecondarySpan from "@/views/common/_comp/text/SecondarySpan.tsx";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for the MovieRatingBadge component.
 */
type Props = {
    /** The numerical rating (usually 0-5). Decimals are floored for star rendering. */
    rating: number;
    /** Optional CSS classes for container positioning or margin adjustments. */
    className?: string;
};

/**
 * Renders a stylized badge containing a star-based visualization and a text ratio.
 * ---
 */
export const MovieRatingBadge = ({rating, className}: Props) => {
    const floorRating = Math.floor(rating);

    return (
        <Badge variant="outline" className={cn("w-fit space-x-2 py-1 px-2.5 dark:border-neutral-600", className)}>
            <MovieReviewRatingStars rating={floorRating} size="15"/>
            <SecondarySpan className="select-none font-medium" text={`${floorRating} / 5`}/>
        </Badge>
    );
};