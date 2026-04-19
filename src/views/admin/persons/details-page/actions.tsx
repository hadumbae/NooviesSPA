/**
 * @fileoverview Action container for the Person Details page.
 * Orchestrates various administrative workflows (edit, image upload, deletion)
 * by syncing local UI context with specialized form panels and dialogs.
 */

import {ReactElement} from "react";
import {PersonDeleteWarningDialog} from "@/views/admin/persons/_feat/delete-person";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {PersonDetailsUIContext} from "@/domains/persons/context/PersonDetailsUIContext.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {Person, PersonDetails} from "@/domains/persons/schema/person/Person.types.ts";
import {useNavigateToPersonIndex} from "@/domains/persons/_feat/navigation";
import {
    UploadPersonProfileImageForm,
    UploadPersonProfileImageFormPanel
} from "@/views/admin/persons/_feat/profile-image-form";
import {PersonSubmitForm, PersonSubmitFormPanel} from "@/views/admin/persons/_feat/submit-form";

/**
 * Props for the {@link PersonDetailsPageActions} component.
 */
type ActionProps = {
    person: PersonDetails;
    className?: string;
};

/**
 * Renders the administrative action suite for a single Person.
 */
export function PersonDetailsPageActions(
    {person, className}: ActionProps
): ReactElement {
    const {_id, name} = person;
    const navigate = useLoggedNavigate();

    const {
        isEditing,
        setIsEditing,
        isUpdatingProfileImage,
        setIsUpdatingProfileImage,
        isDeletingPerson,
        setIsDeletingPerson,
    } = useRequiredContext({context: PersonDetailsUIContext});

    const replaceOnUpdate = (updatedPerson: Person) => {
        navigate({
            to: `/admin/persons/get/${updatedPerson.slug}`,
            component: PersonDetailsPageActions.name,
            message: "Syncing URL slug after person update.",
            options: {replace: true}
        });
    };

    return (
        <div className={className}>
            <PersonSubmitForm
                onSubmitSuccess={replaceOnUpdate}
                editEntity={person}
            >
                <PersonSubmitFormPanel
                    isEditing={true}
                    isOpen={isEditing}
                    setIsOpen={setIsEditing}
                />
            </PersonSubmitForm>


            <UploadPersonProfileImageForm
                onSubmitSuccess={() => setIsUpdatingProfileImage(false)}
                successMessage="Profile Image Updated."
                personID={_id}
            >
                <UploadPersonProfileImageFormPanel
                    isOpen={isUpdatingProfileImage}
                    setIsOpen={setIsUpdatingProfileImage}
                />
            </UploadPersonProfileImageForm>

            <PersonDeleteWarningDialog
                personName={name}
                personID={_id}
                onSubmitSuccess={() => useNavigateToPersonIndex()}
                isOpen={isDeletingPerson}
                setIsOpen={setIsDeletingPerson}
            />
        </div>
    );
}