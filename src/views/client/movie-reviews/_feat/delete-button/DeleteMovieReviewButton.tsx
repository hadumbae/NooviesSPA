/**
 * @fileoverview A button component that triggers the deletion of a specific movie review.
 */

import {ReactElement} from "react";
import {Button, ButtonProps} from "@/common/components/ui";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {ObjectId} from "@/common/_schemas";
import {Trash} from "lucide-react";
import AnimatedLoader from "@/common/components/loaders/AnimatedLoader.tsx";
import {useDeleteCurrentUserMovieReviewMutation} from "@/domains/movie-reviews";

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
            className={cn("hover-button", className)}
            onClick={onDeleteClick}
        >
            {isPending ? <AnimatedLoader/> : <Trash/>}
        </Button>
    );
}
