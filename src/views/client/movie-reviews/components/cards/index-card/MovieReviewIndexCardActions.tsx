/**
 * @file Inline action menu for managing individual movie reviews.
 * @filename MovieReviewIndexCardActions.tsx
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {Ellipsis} from "lucide-react";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {
    useDeleteCurrentUserMovieReviewMutation
} from "@/domains/review/mutations/delete-user-movie-submit/useDeleteCurrentUserMovieReviewMutation.ts";
import {useState} from "react";
import {toast} from "react-toastify";
import {Popover, PopoverContent, PopoverTrigger} from "@/common/components/ui/popover.tsx";
import {Button} from "@/common/components/ui/button.tsx";

/**
 * Props for the {@link MovieReviewIndexCardActions} component.
 */
type ActionProps = {
    /**
     * The unique identifier of the review to be managed.
     */
    reviewID: ObjectId;
    /**
     * Optional ID of the associated movie.
     * Used for cache invalidation or related data updates upon deletion.
     */
    movieID?: ObjectId;
    /**
     * Callback function to trigger the "Edit" state in the parent component.
     * Typically opens a modal or switches to an inline form.
     */
    toggleEdit: (openState: boolean) => void;
};

/**
 * Renders a dropdown menu containing management actions (Edit, Delete) for a review.
 * @param props - Component {@link ActionProps}.
 */
export const MovieReviewIndexCardActions = (
    {reviewID, movieID, toggleEdit}: ActionProps
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {mutate: deleteReview} = useDeleteCurrentUserMovieReviewMutation({
        successMessage: "Review Removed",
        onDeleteSuccess: () => setIsLoading(false),
        onDeleteError: () => setIsLoading(false),
    });

    /**
     * Internal handler to initiate the deletion process.
     * Prevents re-entry via `isLoading` check.
     */
    const onClickDelete = () => {
        if (!isLoading) {
            setIsLoading(true);
            deleteReview({reviewID, movieID});
        } else {
            toast.warning("Action Currently Unavailable");
        }
    }

    return (
        <Popover defaultOpen={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <IconButton>
                    <Ellipsis/>
                </IconButton>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-0 flex flex-col">
                <Button
                    variant="ghost"
                    className="rounded py-5"
                    onClick={() => toggleEdit(true)}
                >
                    Edit
                </Button>

                <Button
                    variant="ghost"
                    className="rounded py-5"
                    onClick={onClickDelete}
                >
                    Delete
                </Button>
            </PopoverContent>
        </Popover>
    );
};