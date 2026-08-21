/**
 * @fileoverview Container for movie-related action dialogs and panels in the admin details view.
 */

import {ReactElement} from "react";
import {
    MoviePosterImageSubmitFormPanel
} from "@/views/admin/movies/_feat/submit-poster-image/MoviePosterImageSubmitFormPanel.tsx";
import {MovieDeleteWarningDialog} from "@/views/admin/movies/_feat/delete-movie";
import {ObjectId} from "@/common/_schemas";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {MoviePosterImageDeleteDialog} from "@/views/admin/movies/_feat/delete-poster-image";
import {MoviePosterImageSubmitForm} from "@/views/admin/movies/_feat";
import {
    useIsDeletingMoviePosterUIActions,
    useIsDeletingMoviePosterUIContext,
    useIsUpdatingMoviePosterUIActions,
    useIsUpdatingMoviePosterUIContext
} from "@/domains/movies";
import {useIsDeletingUIContext, useIsDeletingUIContextActions} from "@/common/_ctx/ui";

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

    const isDeleting = useIsDeletingUIContext();
    const isUpdatingPoster = useIsUpdatingMoviePosterUIContext();
    const isDeletingPoster = useIsDeletingMoviePosterUIContext();

    const {toggle: toggleIsDeleting, close: closeIsDeleting} = useIsDeletingUIContextActions();
    const {toggle: toggleDeletingPoster, close: closeIsDeletingPoster} = useIsDeletingMoviePosterUIActions();
    const {toggle: toggleIsUpdatingPoster} = useIsUpdatingMoviePosterUIActions();


    const onMovieDelete = () => {
        closeIsDeleting();

        navigate({
            to: "/admin/movies",
            message: "Navigate to index after movie delete.",
            level: "log",
            context: {removeID: movieID},
        });
    }

    const onPosterRemove = () => closeIsDeletingPoster();

    return (
        <div className={className}>
            <MoviePosterImageSubmitForm movieID={movieID} successMessage="Updated.">
                <MoviePosterImageSubmitFormPanel
                    isOpen={isUpdatingPoster}
                    setIsOpen={toggleIsUpdatingPoster}
                />
            </MoviePosterImageSubmitForm>

            <MovieDeleteWarningDialog
                movieID={movieID}
                isOpen={isDeleting}
                setIsOpen={toggleIsDeleting}
                onSubmitSuccess={onMovieDelete}
            />

            <MoviePosterImageDeleteDialog
                movieID={movieID}
                isOpen={isDeletingPoster}
                setIsOpen={toggleDeletingPoster}
                onSubmitSuccess={onPosterRemove}
                submitMessage="Removing..."
                successMessage="Poster Image Removed."
            />
        </div>
    );
}