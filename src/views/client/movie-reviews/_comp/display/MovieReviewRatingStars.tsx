/**
 * @fileoverview Renders a 5-star rating display for movie reviews.
 */

import {Star} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {ReactElement} from "react";

/** Props for the MovieReviewRatingStars component. */
type StarProps = {
    rating: number | null;
    size?: string | number | undefined;
};

/**
 * Displays a fixed 5-star rating based on a numeric value.
 */
export function MovieReviewRatingStars(
    {rating, size}: StarProps
): ReactElement {
    return (
        <div className={cn("flex items-center space-x-1")}>
            {[1, 2, 3, 4, 5].map((val) => (
                <Star key={`movie-review-star-${val}`} size={size} className={cn(
                    "inactive-rating-star",
                    (rating && val <= rating) && "active-rating-star",
                )}/>
            ))}
        </div>
    );
}