/**
 * @fileoverview Container for movie-related action dialogs and panels in the admin details view.
 */

import {ReactElement} from "react";
import {MovieDeleteWarningDialog} from "@/views/admin/movies/_feat/delete-movie";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {useIsDeletingUIContext, useIsDeletingUIContextActions} from "@/common/_ctx/ui";
import {
    MovieDetailsPageActionsProps
} from "@/views/admin/movies/_pages/details-page/actions/MovieDetailsPageActionsProps.ts";

/**
 * Renders the action triggers and dialogs for movie management.
 */
export function MovieDetailsPageItemActions(
    {movieID, className}: MovieDetailsPageActionsProps
): ReactElement {
    const navigate = useLoggedNavigate();

    const isDeleting = useIsDeletingUIContext();
    const {toggle: toggleIsDeleting, close: closeIsDeleting} = useIsDeletingUIContextActions();


    const onMovieDelete = () => {
        closeIsDeleting();

        navigate({
            to: "/admin/movies",
            message: "Navigate to index after movie delete.",
            level: "log",
            context: {removeID: movieID},
        });
    }

    return (
        <div className={className}>
            <MovieDeleteWarningDialog
                movieID={movieID}
                isOpen={isDeleting}
                setIsOpen={toggleIsDeleting}
                onSubmitSuccess={onMovieDelete}
            />
        </div>
    );
}