/**
 * @fileoverview Container for movie-related action dialogs and panels in the admin details view.
 */

import {ReactElement} from "react";
import MoviePosterImageSubmitFormPanel
    from "@/views/admin/movies/_feat/submit-poster-image/MoviePosterImageSubmitFormPanel.tsx";
import {MovieDeleteWarningDialog} from "@/views/admin/movies/_feat/delete-movie";
import MoviePosterImageDeleteDialog
    from "@/views/admin/movies/_feat/delete-poster-image/MoviePosterImageDeleteDialog.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {MovieDetailsUIContext} from "@/domains/movies/context/details-ui";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

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
    const {
        isUpdatingPoster,
        setIsUpdatingPoster,
        isDeleting,
        setIsDeleting,
        isDeletingPoster,
        setIsDeletingPoster,
    } = useRequiredContext({context: MovieDetailsUIContext});

    return (
        <div className={className}>
            <MoviePosterImageSubmitFormPanel
                movieID={movieID}
                presetOpen={isUpdatingPoster}
                setPresetOpen={setIsUpdatingPoster}
            />

            <MovieDeleteWarningDialog
                movieID={movieID}
                isOpen={isDeleting}
                setIsOpen={setIsDeleting}
            />

            <MoviePosterImageDeleteDialog
                movieID={movieID}
                presetOpen={isDeletingPoster}
                setPresetOpen={setIsDeletingPoster}
            />
        </div>
    );
}