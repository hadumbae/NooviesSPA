/**
 * @fileoverview Dialog component for confirming and executing movie banner image deletion.
 */

import {
    createMovieImageDeleteDialog
} from "@/views/admin/movies/_feat/delete-movie-image/createMovieImageDeleteDialog.tsx";
import {useDeleteMovieBannerImage} from "@/domains/movies/_feat/manage-images/remove-image";

const {DeleteDialog} = createMovieImageDeleteDialog({
    mutation: useDeleteMovieBannerImage,
    title: "Remove Movie Banner Image?",
    description: "Remove the movie's banner image? This is an irreversible action.",
});

export {
    /** Dialog component for triggering movie banner image removal. */
        DeleteDialog as MovieBannerImageDeleteDialog,
}