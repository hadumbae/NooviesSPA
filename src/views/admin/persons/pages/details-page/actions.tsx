/**
 * @fileoverview Action container for the Person Details page.
 * Orchestrates various administrative workflows (edit, image upload, deletion)
 * by syncing local UI context with specialized form panels and dialogs.
 */

import {ReactElement} from "react";
import PersonSubmitFormPanel from "@/views/admin/persons/_feat/submit-form/PersonSubmitFormPanel.tsx";
import UploadPersonProfileImageFormPanel
    from "@/views/admin/persons/_feat/profile-image-form/UploadPersonProfileImageFormPanel.tsx";
import {PersonDeleteWarningDialog} from "@/views/admin/persons/_feat/delete-person";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {PersonDetailsUIContext} from "@/domains/persons/context/PersonDetailsUIContext.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {Person, PersonDetails} from "@/domains/persons/schema/person/Person.types.ts";

/**
 * Props for the {@link PersonDetailsPageActions} component.
 */
type ActionProps = {
    /** The person entity being managed. */
    person: PersonDetails;
    /** Optional styling for the wrapper container. */
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

    const navigateToPersonIndex = () => {
        navigate({
            to: "/admin/persons",
            component: PersonDetailsPageActions.name,
            message: "Navigation to index after person deletion."
        });
    };

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
            <PersonSubmitFormPanel
                isEditing={true}
                entity={person}
                presetOpen={isEditing}
                setPresetOpen={setIsEditing}
                onSubmitSuccess={replaceOnUpdate}
            />

            <UploadPersonProfileImageFormPanel
                personID={_id}
                presetOpen={isUpdatingProfileImage}
                setPresetOpen={setIsUpdatingProfileImage}
            />

            <PersonDeleteWarningDialog
                personName={name}
                personID={_id}
                onSubmitSuccess={navigateToPersonIndex}
                isOpen={isDeletingPerson}
                setIsOpen={setIsDeletingPerson}
            />
        </div>
    );
}