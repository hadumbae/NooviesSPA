/**
 * @fileoverview A button component that triggers the deletion of a specific movie review.
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {Button, ButtonProps} from "@/common/components/ui/button.tsx";
import {Trash} from "lucide-react";
import {
    useDeleteCurrentUserMovieReviewMutation
} from "@/domains/review/_feat/my-reviews/hooks/useDeleteCurrentUserMovieReviewMutation.ts";
import AnimatedLoader from "@/common/components/loaders/AnimatedLoader.tsx";
import {cn} from "@/common/lib/utils.ts";
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";
import {ReactElement} from "react";

/** Props for the DeleteMovieReviewButton component. */
type DeleteProps = Omit<ButtonProps, "onClick"> & {
    reviewID: ObjectId;
    movieID?: ObjectId;
};

/** Button that executes a mutation to delete the current user's movie review. */
export function DeleteMovieReviewButton(
    {reviewID, movieID, disabled, className, variant = "link", ...buttonProps}: DeleteProps
): ReactElement {
    const {
        isPending,
        isSuccess,
        mutate: deleteReview
    } = useDeleteCurrentUserMovieReviewMutation();

    const onDeleteClick = () => {
        deleteReview({reviewID, movieID});
    };

    return (
        <Button
            {...buttonProps}
            variant={variant}
            disabled={disabled || isPending || isSuccess}
            className={cn(HoverLinkCSS, className)}
            onClick={onDeleteClick}
        >
            {isPending ? <AnimatedLoader/> : <Trash/>}
        </Button>
    );
}
