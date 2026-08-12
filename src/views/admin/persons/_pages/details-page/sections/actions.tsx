/**
 * @fileoverview Action triggers and modal forms for managing a specific person's details and profile image.
 */

import {ReactElement} from "react";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {PersonSubmitForm, PersonSubmitFormPanel} from "@/views/admin/persons/_feat/submit-form";
import {PersonDeleteWarningDialog} from "@/views/admin/persons/_feat/delete-person";
import {buildPersonEditData, Person} from "@/domains/persons";
import {
    UploadPersonProfileImageForm,
    UploadPersonProfileImageFormPanel
} from "@/views/admin/persons/_feat/profile-image-form";
import {
    usePersonDeletingUIActions,
    usePersonDeletingUIState,
    usePersonFormUIActions,
    usePersonFormUIState,
    usePersonImageFormUIActions,
    usePersonImageFormUIState
} from "@/domains/persons/_ctx/ui";

/** Props for the PersonDetailsPageActions component. */
type ActionProps = {
    person: Person;
    className?: string;
};

/**
 * Orchestrates administrative actions for a person, including editing, image uploads, and deletion.
 */
export function PersonDetailsPageActions(
    {person, className}: ActionProps
): ReactElement {
    const {_id, name} = person;
    const navigate = useLoggedNavigate();
    const editEntity = buildPersonEditData(person);

    const {close: closeEditing, toggle: toggleEditing} = usePersonFormUIActions();
    const {close: closeUpdatingAvatar, toggle: toggleUpdatingAvatar} = usePersonImageFormUIActions();
    const {close: closeDeleting, toggle: toggleDeleting} = usePersonDeletingUIActions();

    const isEditing = usePersonFormUIState();
    const isUpdatingAvatar = usePersonImageFormUIState();
    const isDeleting = usePersonDeletingUIState();

    const replaceOnUpdate = (updatedPerson: Person) => {
        closeEditing();

        navigate({
            to: `/admin/persons/get/${updatedPerson.slug}`,
            component: PersonDetailsPageActions.name,
            message: "Syncing URL slug after person update.",
            options: {replace: true}
        });
    };

    return (
        <div className={className}>
            <PersonSubmitForm onSubmitSuccess={replaceOnUpdate} successMessage="Updated!" editEntity={editEntity}>
                <PersonSubmitFormPanel isEditing={true} isOpen={isEditing} setIsOpen={toggleEditing}/>
            </PersonSubmitForm>


            <UploadPersonProfileImageForm
                onSubmitSuccess={() => closeUpdatingAvatar()}
                successMessage="Profile Image Updated."
                personID={_id}
            >
                <UploadPersonProfileImageFormPanel
                    isOpen={isUpdatingAvatar}
                    setIsOpen={toggleUpdatingAvatar}
                />
            </UploadPersonProfileImageForm>

            <PersonDeleteWarningDialog
                personName={name}
                personID={_id}
                onSubmitSuccess={() => closeDeleting()}
                isOpen={isDeleting}
                setIsOpen={toggleDeleting}
            />
        </div>
    );
}