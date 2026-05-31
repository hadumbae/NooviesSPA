/**
 * @fileoverview Component for displaying and interacting with movie review helpful counts.
 */

import {Button, buttonVariants} from "@/common/components/ui/button.tsx";
import {ThumbsUp} from "lucide-react";
import PrimarySpan from "@/views/common/_comp/text/PrimarySpan.tsx";
import {cn} from "@/common/lib/utils.ts";
import {ReactElement} from "react";

/** Props for the MovieReviewHelpfulButton component. */
type HelpfulProps = {
    buttonSize?: string | number;
    isLikedByUser?: boolean;
    likeCount: number;
    disabled?: boolean;
    textOnly?: boolean;
};

/**
 * Renders a helpfulness indicator that allows users to like a review.
 */
export function MovieReviewHelpfulButton(
    {likeCount, isLikedByUser, disabled, textOnly, buttonSize = 20}: HelpfulProps
): ReactElement {
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
}