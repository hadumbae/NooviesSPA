/**
 * @file Helpful button component for movie reviews.
 * @filename MovieReviewHelpfulButton.tsx
 */

import { Button } from "@/common/components/ui/button.tsx";
import { ThumbsUp } from "lucide-react";
import PrimarySpan from "@/features/common/text/PrimarySpan.tsx";
import { cn } from "@/common/lib/utils.ts";

/**
 * Props for MovieReviewHelpfulButton.
 */
type HelpfulProps = {
    /** Icon size in pixels */
    buttonSize?: string | number;

    /** Whether the current user liked the review */
    isLikedByUser?: boolean;

    /** Total number of helpful likes */
    likeCount: number;
};

/**
 * Displays a like button and total helpful count for a review.
 */
const MovieReviewHelpfulButton = (
    { likeCount, isLikedByUser, buttonSize = 20 }: HelpfulProps
) => {
    return (
        <div className="flex items-center space-x-1">
            <Button
                variant="link"
                size="icon"
                onClick={() => console.log("Added To Like")}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-3xl"
            >
                <ThumbsUp
                    size={buttonSize}
                    className={cn(isLikedByUser && "text-pink-500")}
                />
            </Button>

            <PrimarySpan>
                Helpful • {likeCount}
            </PrimarySpan>
        </div>
    );
};

export default MovieReviewHelpfulButton;