/**
 * @fileoverview Container for movie-related action dialogs and panels in the admin details view.
 */

import {ReactElement} from "react";
import {
    MoviePosterImageSubmitFormPanel
} from "@/views/admin/movies/_feat/submit-poster-image/MoviePosterImageSubmitFormPanel.tsx";
import {MovieDeleteWarningDialog} from "@/views/admin/movies/_feat/delete-movie";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {MovieDetailsUISettersContext, MovieDetailsUIStatesContext} from "@/domains/movies/_ctx/details-ui";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {MoviePosterImageDeleteDialog} from "@/views/admin/movies/_feat/delete-poster-image";
import {MoviePosterImageSubmitForm} from "@/views/admin/movies/_feat";

/** Props for the MovieDetailsPageActions component. */
type ActionProps = {
    movieID: ObjectId;
    className?: string;
};

/**
 * Renders the action triggers and dialogs for movie management.
 */
export function MovieDetailsPageActions(
    {movieID, className}: ActionProps
): ReactElement {
    const navigate = useLoggedNavigate();
    const {
        isUpdatingPoster,
        isDeleting,
        isDeletingPoster,
    } = useRequiredContext({context: MovieDetailsUIStatesContext});

    const {
        setIsUpdatingPoster,
        setIsDeleting,
        setIsDeletingPoster,
    } = useRequiredContext({context: MovieDetailsUISettersContext});

    const onMovieDelete = () => {
        setIsDeleting(false);

        navigate({
            to: "/admin/movies",
            message: "Navigate to index after movie delete.",
            level: "log",
            context: {removeID: movieID},
        });
    }

    const onPosterRemove = () => setIsDeletingPoster(false);

    return (
        <div className={className}>
            <MoviePosterImageSubmitForm movieID={movieID} successMessage="Updated.">
                <MoviePosterImageSubmitFormPanel
                    isOpen={isUpdatingPoster}
                    setIsOpen={setIsUpdatingPoster}
                />
            </MoviePosterImageSubmitForm>

            <MovieDeleteWarningDialog
                movieID={movieID}
                isOpen={isDeleting}
                setIsOpen={setIsDeleting}
                onSubmitSuccess={onMovieDelete}
            />

            <MoviePosterImageDeleteDialog
                movieID={movieID}
                isOpen={isDeletingPoster}
                setIsOpen={setIsDeletingPoster}
                onSubmitSuccess={onPosterRemove}
                submitMessage="Removing..."
                successMessage="Poster Image Removed."
            />
        </div>
    );
}