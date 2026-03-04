/**
 * @file Renders a 5-star rating display for movie reviews.
 *
 * MovieReviewRatingStars.tsx
 */

import {Star} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {ACTIVE_STAR_CSS, INACTIVE_STAR_CSS} from "@/pages/review/constants/RatingStarCSS.ts";

/**
 * Props for MovieReviewRatingStars.
 */
type StarProps = {
    /**
     * Rating value. Null renders all stars inactive.
     */
    rating: number | null;

    /**
     * Icon size forwarded to the Star component.
     */
    size?: string | number | undefined;
};

/**
 * Displays a fixed 5-star rating.
 */
const MovieReviewRatingStars = ({rating, size}: StarProps) => {
    return (
        <div className={cn("flex items-center space-x-1")}>
            {[1, 2, 3, 4, 5].map((val) => (
                <Star
                    key={`movie-review-star-${val}`}
                    size={size}
                    className={cn(
                        INACTIVE_STAR_CSS,
                        (rating && val <= rating) && ACTIVE_STAR_CSS,
                    )}
                />
            ))}
        </div>
    );
};

export default MovieReviewRatingStars;