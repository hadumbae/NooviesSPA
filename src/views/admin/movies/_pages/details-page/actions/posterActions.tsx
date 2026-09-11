/**
 * @fileoverview Action triggers for updating and removing a movie poster image on the movie details page.
 */

import {ReactElement} from "react";
import {ObjectId} from "@/common/_schemas";
import {MoviePosterImageSubmitForm} from "@/views/admin/movies/_feat/submit-movie-image/MoviePosterImageSubmitForm.tsx";
import {MoviePosterImageDeleteDialog} from "@/views/admin/movies/_feat/delete-movie-image";
import {MovieImageSubmitFormPanel} from "@/views/admin/movies/_feat/submit-movie-image/MovieImageSubmitFormPanel.tsx";
import {
    useIsDeletingMoviePosterUIActions,
    useIsDeletingMoviePosterUIContext,
    useIsUpdatingMoviePosterUIActions,
    useIsUpdatingMoviePosterUIContext
} from "@/domains/movies/_ctx/ui";

/** Props for the MovieDetailsPagePosterActions component. */
type ActionProps = {
    movieID: ObjectId;
    className?: string;
};

/**
 * Action panel that handles poster image upload and deletion for a specific movie.
 */
export function MovieDetailsPagePosterActions(
    {movieID, className}: ActionProps
): ReactElement {
    const isUpdatingImage = useIsUpdatingMoviePosterUIContext();
    const isDeletingImage = useIsDeletingMoviePosterUIContext();

    const {toggle: toggleDeletingImage, close: closeIsDeletingPoster} = useIsDeletingMoviePosterUIActions();
    const {toggle: toggleIsUpdatingImage, close: closeIsUpdatingPoster} = useIsUpdatingMoviePosterUIActions();

    const onImageUpdate = () => closeIsUpdatingPoster();
    const onImageRemove = () => closeIsDeletingPoster();

    return (
        <div className={className}>
            <MoviePosterImageSubmitForm
                mutConfig={{movieID}}
                onSubmitSuccess={onImageUpdate}
                resetOnSuccess={true}
                successMessage="Updated."
            >
                <MovieImageSubmitFormPanel
                    isOpen={isUpdatingImage}
                    setIsOpen={toggleIsUpdatingImage}
                    title="Upload Poster Image"
                    description="Upload poster image here. Select image and upload."
                />
            </MoviePosterImageSubmitForm>

            <MoviePosterImageDeleteDialog
                movieID={movieID}
                isOpen={isDeletingImage}
                setIsOpen={toggleDeletingImage}
                onSubmitSuccess={onImageRemove}
                submitMessage="Removing..."
                successMessage="Poster Image Removed."
            />
        </div>
    );
}