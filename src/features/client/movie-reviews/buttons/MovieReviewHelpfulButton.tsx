/**
 * @file Helpful indicator and like action for movie reviews.
 * @filename MovieReviewHelpfulButton.tsx
 */

import {Button} from "@/common/components/ui/button.tsx";
import {ThumbsUp} from "lucide-react";
import PrimarySpan from "@/features/common/text/PrimarySpan.tsx";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for MovieReviewHelpfulButton.
 */
type HelpfulProps = {
    /** Icon size in pixels */
    buttonSize?: string | number;

    /** Highlights icon if user already liked */
    isLikedByUser?: boolean;

    /** Total helpful votes */
    likeCount: number;

    /** Disables like interaction */
    disabled?: boolean;

    /** Hides button and shows text only */
    textOnly?: boolean;
};

/**
 * Shows helpful count with optional like action.
 */
const MovieReviewHelpfulButton = (
    {likeCount, isLikedByUser, disabled, textOnly, buttonSize = 20}: HelpfulProps
) => {
    return (
        <div className="flex items-center space-x-1">
            {
                !textOnly && (
                    <Button
                        variant="link"
                        size="icon"
                        onClick={() => console.log("Added To Like")}
                        className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-3xl"
                        disabled={disabled}
                    >
                        <ThumbsUp
                            size={buttonSize}
                            className={cn(isLikedByUser && "text-pink-500")}
                        />
                    </Button>
                )
            }

            <PrimarySpan>
                Helpful • {likeCount}
            </PrimarySpan>
        </div>
    );
};

export default MovieReviewHelpfulButton;