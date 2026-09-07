/**
 * @fileoverview Action triggers for updating and removing a movie banner image on the movie details page.
 */

import {ReactElement} from "react";
import {MovieBannerImageDeleteDialog} from "@/views/admin/movies/_feat/delete-movie-image";
import {MovieImageSubmitFormPanel} from "@/views/admin/movies/_feat/submit-movie-image/MovieImageSubmitFormPanel.tsx";
import {MovieBannerImageSubmitForm} from "@/views/admin/movies/_feat/submit-movie-image/MovieBannerImageSubmitForm.tsx";
import {
    useIsDeletingMovieBannerUIActions,
    useIsDeletingMovieBannerUIContext,
    useIsUpdatingMovieBannerUIActions,
    useIsUpdatingMovieBannerUIContext
} from "@/domains/movies/_ctx/ui";
import {
    MovieDetailsPageActionsProps
} from "@/views/admin/movies/_pages/details-page/actions/MovieDetailsPageActionsProps.ts";

/**
 * Action panel that handles banner image upload and deletion for a specific movie.
 */
export function MovieDetailsPageBannerActions(
    {movieID, className}: MovieDetailsPageActionsProps
): ReactElement {
    const isUpdatingImage = useIsUpdatingMovieBannerUIContext();
    const isDeletingImage = useIsDeletingMovieBannerUIContext();

    const {toggle: toggleDeletingImage, close: closeIsDeletingBanner} = useIsDeletingMovieBannerUIActions();
    const {toggle: toggleIsUpdatingImage, close: closeIsUpdatingBanner} = useIsUpdatingMovieBannerUIActions();

    const onImageUpdate = () => closeIsUpdatingBanner();
    const onImageRemove = () => closeIsDeletingBanner();

    return (
        <div className={className}>
            <MovieBannerImageSubmitForm
                mutConfig={{movieID}}
                onSubmitSuccess={onImageUpdate}
                resetOnSuccess={true}
                successMessage="Updated."
            >
                <MovieImageSubmitFormPanel
                    isOpen={isUpdatingImage}
                    setIsOpen={toggleIsUpdatingImage}
                    title="Upload Banner Image"
                    description="Upload banner image here. Select image and upload."
                />
            </MovieBannerImageSubmitForm>

            <MovieBannerImageDeleteDialog
                movieID={movieID}
                isOpen={isDeletingImage}
                setIsOpen={toggleDeletingImage}
                onSubmitSuccess={onImageRemove}
                submitMessage="Removing..."
                successMessage="Banner Image Removed."
            />
        </div>
    );
}