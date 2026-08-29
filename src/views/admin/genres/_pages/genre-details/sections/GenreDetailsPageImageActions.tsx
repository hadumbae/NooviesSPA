/**
 * @fileoverview Dialogs and forms for managing genre image upload and deletion actions on the genre details page.
 */

import {ReactElement} from "react";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {
    Genre,
    useDeletingGenreImageUIContext,
    useDeletingGenreImageUIContextActions,
    usePendingGenreImageDeleteUIContextActions,
    usePendingGenreImageUpdateUIContextActions,
    useUpdatingGenreImageUIContext,
    useUpdatingGenreImageUIContextActions
} from "@/domains/genres";
import {GenreImageUploadForm, GenreImageUploadPanel, RemoveGenreImageWarningDialog,} from "@/views/admin/genres/_feat";

/** Props for the GenreDetailsPageImageActions component. */
type ActionProps = {
    className?: string;
    genre: Genre;
};

/** Renders hidden/modal actions for updating and deleting a genre's image on the details page. */
export function GenreDetailsPageImageActions(
    {className, genre}: ActionProps
): ReactElement {
    const isUpdatingImage = useUpdatingGenreImageUIContext();
    const {toggle: toggleUpdatingImage, close: closeUpdatingImage} = useUpdatingGenreImageUIContextActions();

    const {open: openUpdatePending, close: closeUpdatePending} = usePendingGenreImageUpdateUIContextActions();
    const {open: openDeletePending, close: closeDeletePending} = usePendingGenreImageDeleteUIContextActions();

    const isDeletingImage = useDeletingGenreImageUIContext();
    const {toggle: toggleDeletingImage, close: closeDeletingImage} = useDeletingGenreImageUIContextActions();


    const onImageUpdate = () => {
        closeUpdatingImage();
        closeUpdatePending();
        closeDeletePending();
    }

    return (
        <div className={className}>
            <SROnly text="Genre Image Option Dialogs"/>

            <GenreImageUploadForm
                _id={genre._id}
                resetOnSuccess={true}
                submitMessage="Updating..."
                successMessage="Updated."
                onSubmit={() => openUpdatePending()}
                onSubmitSuccess={() => onImageUpdate()}
            >
                <GenreImageUploadPanel isOpen={isUpdatingImage} setIsOpen={toggleUpdatingImage}/>
            </GenreImageUploadForm>

            <RemoveGenreImageWarningDialog
                isOpen={isDeletingImage}
                setIsOpen={toggleDeletingImage}
                _id={genre._id}
                name={genre.name}
                submitMessage="Removing..."
                onSubmit={() => openDeletePending()}
                onSubmitSuccess={() => closeDeletingImage()}
            />
        </div>
    );
}