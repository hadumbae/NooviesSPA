/**
 * @file Displays helpful count with optional like interaction.
 * @filename MovieReviewHelpfulButton.tsx
 */

import {Button, buttonVariants} from "@/common/components/ui/button.tsx";
import {ThumbsUp} from "lucide-react";
import PrimarySpan from "@/views/common/components/text/PrimarySpan.tsx";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for MovieReviewHelpfulButton.
 */
type HelpfulProps = {
    /** Icon size in pixels */
    buttonSize?: string | number;

    /** Indicates the review is liked by the current user */
    isLikedByUser?: boolean;

    /** Total helpful votes */
    likeCount: number;

    /** Prevents like interaction */
    disabled?: boolean;

    /** Renders static indicator without button interaction */
    textOnly?: boolean;
};

/**
 * Renders helpful engagement indicator with optional action control.
 */
const MovieReviewHelpfulButton = (
    {likeCount, isLikedByUser, disabled, textOnly, buttonSize = 20}: HelpfulProps
) => {
    return (
        <div className="flex items-center space-x-1">
            {
                textOnly
                    ? (<span className={buttonVariants({variant: "link", size: "icon"})}/>)
                    : (
                        <Button
                            variant="link"
                            size="icon"
                            onClick={() => console.log("Added To Like")}
                            className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-3xl"
                            disabled={disabled}
                        >
                            <ThumbsUp
                                size={buttonSize}
                                className={cn(
                                    isLikedByUser && "stroke-yellow-500 fill-yellow-500"
                                )}
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