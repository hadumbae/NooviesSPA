/**
 * @fileoverview Presentation component for the Person Details page.
 * Orchestrates the display of personal metadata and grouped movie credits,
 * while managing administrative overlays for profile updates and deletion.
 */

import {FC} from 'react';
import PersonDetailsBreadcrumbs from "@/views/admin/persons/components/admin/person-details/PersonDetailsBreadcrumbs.tsx";
import PersonDetailsHeader from "@/views/admin/persons/components/admin/person-details/PersonDetailsHeader.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import PersonDetailsCard from "@/views/admin/persons/components/admin/person-details/PersonDetailsCard.tsx";
import PersonDetailsCreditOverview from "@/views/admin/persons/components/admin/person-details/credit-overview/PersonDetailsCreditOverview.tsx";
import PersonSubmitFormPanel from "@/views/admin/persons/components/form/admin/submit/PersonSubmitFormPanel.tsx";
import UploadPersonProfileImageFormPanel from "@/views/admin/persons/components/form/admin/profile-image/UploadPersonProfileImageFormPanel.tsx";
import PersonDeleteWarningDialog from "@/views/admin/persons/components/admin/dialog/PersonDeleteWarningDialog.tsx";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {Person, PersonDetails} from "@/domains/persons/schema/person/Person.types.ts";
import {MovieCreditDetailsExceptPersonGroupedByRoleArray} from "@/domains/moviecredit/schemas/model/movie-credit-grouped-schema/MovieCreditGroup.types.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {PersonDetailsUIContext} from "@/domains/persons/context/PersonDetailsUIContext.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

export type PersonDetailsPageContentProps = {
    person: PersonDetails;
    creditsByRole: MovieCreditDetailsExceptPersonGroupedByRoleArray;
};

/**
 * Renders the primary profile view for a person in the administrative interface.
 */
const PersonDetailsPageContent: FC<PersonDetailsPageContentProps> = (props) => {
    const {person, creditsByRole} = props;
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
            component: PersonDetailsPageContent.name,
            message: "Navigation to index after person deletion."
        });
    };

    const replaceOnUpdate = (updatedPerson: Person) => {
        navigate({
            to: `/admin/persons/get/${updatedPerson.slug}`,
            component: PersonDetailsPageContent.name,
            message: "Syncing URL slug after person update.",
            options: {replace: true}
        });
    };

    return (
        <PageFlexWrapper>
            <PersonDetailsBreadcrumbs name={name} />
            <PersonDetailsHeader person={person} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <section>
                    <SectionHeader srOnly={true}>Personal Details</SectionHeader>
                    <PersonDetailsCard person={person} />
                </section>

                <section className="md:col-span-2">
                    <SectionHeader>Movie Credits</SectionHeader>
                    <PersonDetailsCreditOverview
                        personName={name}
                        creditsByRole={creditsByRole}
                    />
                </section>
            </div>

            <section className="hidden">
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
                    onDeleteSuccess={navigateToPersonIndex}
                    presetOpen={isDeletingPerson}
                    setPresetOpen={setIsDeletingPerson}
                />
            </section>
        </PageFlexWrapper>
    );
};

export default PersonDetailsPageContent;