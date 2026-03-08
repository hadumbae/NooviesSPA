// DeleteMovieReviewButton.tsx

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {Button, ButtonProps} from "@/common/components/ui/button.tsx";
import {Trash} from "lucide-react";
import {
    useDeleteCurrentUserMovieReviewMutation
} from "@/pages/review/mutations/delete-user-movie-submit/useDeleteCurrentUserMovieReviewMutation.ts";
import AnimatedLoader from "@/common/components/loaders/AnimatedLoader.tsx";
import {cn} from "@/common/lib/utils.ts";
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";

type DeleteProps = Omit<ButtonProps, "onClick"> & {
    reviewID: ObjectId;
    movieID?: ObjectId;
};

const DeleteMovieReviewButton = (
    {reviewID, movieID, disabled, className, variant = "link", ...buttonProps}: DeleteProps
) => {
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
};

export default DeleteMovieReviewButton;
