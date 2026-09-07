/**
 * @fileoverview Dialog component for confirming and executing movie poster image deletion.
 */

import {
    createMovieImageDeleteDialog
} from "@/views/admin/movies/_feat/delete-movie-image/createMovieImageDeleteDialog.tsx";
import {useDeleteMoviePosterImage} from "@/domains/movies/_feat/manage-images/remove-image";

const {DeleteDialog} = createMovieImageDeleteDialog({
    mutation: useDeleteMoviePosterImage,
    title: "Remove Movie Poster Image?",
    description: "Remove the movie's poster image? This is an irreversible action.",
});

export {
    /** Dialog component for triggering movie poster image removal. */
        DeleteDialog as MoviePosterImageDeleteDialog
}