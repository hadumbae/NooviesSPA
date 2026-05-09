/**
 * @fileoverview Action components for the Genre Details page, including edit and delete dialogs.
 */

import {ReactElement} from "react";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {
    GenreDetailsUISetterContext,
    GenreDetailsUIStateContext
} from "@/domains/genres/context/genre-details-ui-context";
import {Genre} from "@/domains/genres/schema";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {GenreSubmitForm, GenreSubmitFormPanel} from "@/views/admin/genres/_feat/submit-form";
import {GenreDeleteWarningDialog} from "@/views/admin/genres/_feat/delete-genre";
import {GenreImageUploadForm, GenreImageUploadPanel} from "@/views/admin/genres/_feat/image-upload-form";
import {RemoveGenreImageWarningDialog} from "@/views/admin/genres/_feat/remove-image";

/** Props for the GenreDetailsPageActions component. */
type ActionProps = {
    className?: string;
    genre: Genre;
};

/**
 * Renders the management actions for a specific genre.
 */
export function GenreDetailsPageActions(
    {className, genre}: ActionProps
): ReactElement {
    const navigate = useLoggedNavigate();

    const {
        isEditing,
        isDeleting,
        isUpdatingImage,
        isRemovingImage
    } = useRequiredContext({context: GenreDetailsUIStateContext});

    const {
        setIsEditing,
        setIsDeleting,
        setIsUpdatingImage,
        setIsRemovingImage
    } = useRequiredContext({context: GenreDetailsUISetterContext});

    const replaceSlugOnUpdate = ({slug}: Genre) => {
        navigate({to: `/admin/genres/get/${slug}`, options: {replace: true}});
        setIsEditing(false);
    }

    const navigateOnDelete = () => navigate({
        to: `/admin/genres`,
        message: "Navigation to index after successful genre deletion."
    });

    return (
        <div className={className}>
            <SROnly text="Genre Option Dialogs"/>

            {/* Genre */}

            <GenreSubmitForm
                editEntity={genre}
                onSubmitSuccess={replaceSlugOnUpdate}
                successMessage="Updated"
            >
                <GenreSubmitFormPanel
                    isEditing={true}
                    isOpen={isEditing}
                    setIsOpen={setIsEditing}
                />
            </GenreSubmitForm>

            <GenreDeleteWarningDialog
                isOpen={isDeleting}
                setIsOpen={setIsDeleting}
                _id={genre._id}
                name={genre.name}
                onSubmitSuccess={navigateOnDelete}
            />

            {/* Genre Image */}

            <GenreImageUploadForm _id={genre._id} resetOnSuccess={true}>
                <GenreImageUploadPanel
                    isOpen={isUpdatingImage}
                    setIsOpen={setIsUpdatingImage}
                />
            </GenreImageUploadForm>

            <RemoveGenreImageWarningDialog
                isOpen={isRemovingImage}
                setIsOpen={setIsRemovingImage}
                _id={genre._id}
                name={genre.name}
            />
        </div>
    );
}