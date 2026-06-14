/**
 * @fileoverview Action components for the Genre Details page, including edit and delete dialogs.
 */

import {ReactElement} from "react";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {
    Genre,
    GenreDetailsUIPendingSetterContext,
    GenreDetailsUISetterContext,
    GenreDetailsUIStateContext
} from "@/domains/genres";
import {
    GenreDeleteWarningDialog,
    GenreImageUploadForm,
    GenreImageUploadPanel,
    GenreSubmitForm,
    GenreSubmitFormPanel,
    RemoveGenreImageWarningDialog,
} from "@/views/admin/genres/_feat";

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

    const {
        setIsImageUpdatePending,
        setIsImageRemovalPending
    } = useRequiredContext({context: GenreDetailsUIPendingSetterContext})

    const replaceSlugOnUpdate = ({slug}: Genre) => {
        navigate({to: `/admin/genres/get/${slug}`, options: {replace: true}});
        setIsEditing(false);
    }

    const navigateOnDelete = () => navigate({
        to: `/admin/genres`,
        message: "Navigation to index after successful genre deletion."
    });

    const onImageRemoval = () => {
        setIsRemovingImage(false);
        setIsImageRemovalPending(false);
    }

    return (
        <div className={className}>
            <SROnly text="Genre Option Dialogs"/>

            <GenreSubmitForm formConfig={{editEntity: genre}} onSubmitConfig={{
                onSubmitSuccess: replaceSlugOnUpdate,
                successMessage: "Updated"
            }}>
                <GenreSubmitFormPanel isOpen={isEditing} setIsOpen={setIsEditing}/>
            </GenreSubmitForm>

            <GenreDeleteWarningDialog
                isOpen={isDeleting}
                setIsOpen={setIsDeleting}
                _id={genre._id}
                name={genre.name}
                onSubmitConfig={{onSubmitSuccess: navigateOnDelete}}
            />

            <GenreImageUploadForm _id={genre._id} resetConfig={{resetOnSuccess: true}} onSubmitConfig={{
                submitMessage: "Updating...",
                successMessage: "Updated.",
                onSubmit: () => setIsImageUpdatePending(true),
                onSubmitSuccess: () => setIsUpdatingImage(false),
            }}>
                <GenreImageUploadPanel isOpen={isUpdatingImage} setIsOpen={setIsUpdatingImage}/>
            </GenreImageUploadForm>

            <RemoveGenreImageWarningDialog
                isOpen={isRemovingImage}
                setIsOpen={setIsRemovingImage}
                _id={genre._id}
                name={genre.name}
                onSubmitConfig={{
                    onSubmit: () => setIsImageRemovalPending(true),
                    submitMessage: "Removing...",
                    onSubmitSuccess: onImageRemoval,
                }}
            />
        </div>
    );
}