/**
 * @fileoverview Dialogs and forms for editing and deleting genre details on the genre details page.
 */

import {ReactElement} from "react";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {Genre} from "@/domains/genres";
import {GenreDeleteWarningDialog, GenreSubmitForm, GenreSubmitFormPanel,} from "@/views/admin/genres/_feat";
import {
    useIsDeletingUIContext,
    useIsDeletingUIContextActions,
    useIsEditingUIContext,
    useIsEditingUIContextActions
} from "@/common/_ctx/ui";

/** Props for the GenreDetailsPageGenreActions component. */
type ActionProps = {
    className?: string;
    genre: Genre;
};

/** Renders hidden/modal actions for editing and deleting a genre on the details page. */
export function GenreDetailsPageGenreActions(
    {className, genre}: ActionProps
): ReactElement {
    const navigate = useLoggedNavigate();

    const isEditing = useIsEditingUIContext();
    const {toggle: toggleEditing, close: closeEditing} = useIsEditingUIContextActions();

    const isDeleting = useIsDeletingUIContext();
    const {toggle: toggleDeleting} = useIsDeletingUIContextActions();

    const replaceSlugOnUpdate = ({slug}: Genre) => {
        navigate({to: `/admin/genres/get/${slug}`, options: {replace: true}});
        closeEditing();
    }

    const navigateOnDelete = () => navigate({
        to: `/admin/genres`,
        message: "Navigation to index after successful genre deletion."
    });

    return (
        <div className={className}>
            <SROnly text="Genre Option Dialogs"/>

            <GenreSubmitForm
                editEntity={genre}
                onSubmitSuccess={replaceSlugOnUpdate}
                successMessage="Updated"
            >
                <GenreSubmitFormPanel isOpen={isEditing} setIsOpen={toggleEditing}/>
            </GenreSubmitForm>

            <GenreDeleteWarningDialog
                isOpen={isDeleting}
                setIsOpen={toggleDeleting}
                _id={genre._id}
                name={genre.name}
                onSubmitConfig={{onSubmitSuccess: navigateOnDelete}}
            />
        </div>
    );
}