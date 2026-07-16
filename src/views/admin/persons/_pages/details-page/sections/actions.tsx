/**
 * @fileoverview Action triggers and modal forms for managing a specific person's details and profile image.
 */

import {ReactElement} from "react";
import useRequiredContext from "@/common/_feat/use-context/useRequiredContext.ts";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {
    Person,
    PersonDetailsUISettersContext,
    PersonDetailsUIStatesContext,
    useNavigateToPersonIndex
} from "@/domains/persons";
import {PersonSubmitForm, PersonSubmitFormPanel} from "@/views/admin/persons/_feat/submit-form";
import {PersonDeleteWarningDialog} from "@/views/admin/persons/_feat/delete-person";
import {
    UploadPersonProfileImageForm,
    UploadPersonProfileImageFormPanel
} from "@/views/admin/persons/_feat/profile-image-form";

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

    const {
        isEditing,
        isUpdatingProfileImage,
        isDeletingPerson,
    } = useRequiredContext({context: PersonDetailsUIStatesContext});

    const {
        setIsEditing,
        setIsUpdatingProfileImage,
        setIsDeletingPerson,
    } = useRequiredContext({context: PersonDetailsUISettersContext});

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
            <PersonSubmitForm onSubmitSuccess={replaceOnUpdate} editEntity={person}>
                <PersonSubmitFormPanel isEditing={true} isOpen={isEditing} setIsOpen={setIsEditing}/>
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