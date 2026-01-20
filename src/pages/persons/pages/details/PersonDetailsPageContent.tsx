import {FC} from 'react';
import PersonDetailsBreadcrumbs from "@/pages/persons/components/admin/person-details/PersonDetailsBreadcrumbs.tsx";
import PersonDetailsHeader from "@/pages/persons/components/admin/person-details/PersonDetailsHeader.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import PersonDetailsCard from "@/pages/persons/components/admin/person-details/PersonDetailsCard.tsx";
import PersonDetailsCreditOverview
    from "@/pages/persons/components/admin/person-details/credit-overview/PersonDetailsCreditOverview.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import PersonSubmitFormPanel from "@/pages/persons/components/form/admin/submit/PersonSubmitFormPanel.tsx";
import UploadPersonProfileImageFormPanel
    from "@/pages/persons/components/form/admin/profile-image/UploadPersonProfileImageFormPanel.tsx";
import PersonDeleteWarningDialog from "@/pages/persons/components/admin/dialog/PersonDeleteWarningDialog.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import {Person, PersonDetails} from "@/pages/persons/schema/person/Person.types.ts";
import {
    MovieCreditDetailsExceptPersonGroupedByRoleArray
} from "@/pages/moviecredit/schemas/model/MovieCreditGroup.types.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {PersonDetailsUIContext} from "@/pages/persons/context/PersonDetailsUIContext.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

/**
 * Props for {@link PersonDetailsPageContent} component.
 *
 * @property person - Detailed information of a single person, including metadata such as name and ID.
 * @property creditsByRole - Movie credit information grouped by role for this person.
 */
export type PersonDetailsPageContentProps = {
    person: PersonDetails;
    creditsByRole: MovieCreditDetailsExceptPersonGroupedByRoleArray;
};

/**
 * **Person Details Page Content**
 *
 * Main page component for displaying a single person's detailed profile and associated movie credits.
 *
 * @remarks
 * - Renders **breadcrumbs** and a **header** for the person.
 * - Displays **personal details** and **movie credits** in a responsive grid.
 * - Provides hidden admin panels for:
 *   - Editing person information ({@link PersonSubmitFormPanel})
 *   - Uploading a profile image ({@link UploadPersonProfileImageFormPanel})
 *   - Deleting the person ({@link PersonDeleteWarningDialog})
 * - Uses {@link PersonDetailsUIContext} for controlling visibility of admin forms and dialogs.
 * - Navigation after deletion uses {@link useLoggedNavigate} for structured logging.
 *
 * @example
 * ```tsx
 * <PersonDetailsPageContent
 *    person={selectedPerson}
 *    creditsByRole={creditsGroupedByRole}
 * />
 * ```
 *
 * @see {@link PersonDetailsCard} — Component displaying key personal details.
 * @see {@link PersonDetailsCreditOverview} — Component displaying grouped movie credits.
 * @see {@link PersonSubmitFormPanel} — Admin form for editing person details.
 * @see {@link UploadPersonProfileImageFormPanel} — Admin form for updating profile image.
 * @see {@link PersonDeleteWarningDialog} — Confirmation dialog for deleting a person.
 */
const PersonDetailsPageContent: FC<PersonDetailsPageContentProps> = (props) => {
    // ⚡ State ⚡

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
            component: PersonDetailsHeader.name,
            message: "Navigation on person deletion."
        });
    };

    const replaceOnUpdate = (person: Person) => {
        navigate({
            to: `/admin/persons/get/${person.slug}`,
            component: PersonDetailsPageContent.name,
            message: "Update slug in URL.",
            options: {replace: true},
        });
    }

    return (
        <PageFlexWrapper>
            <PersonDetailsBreadcrumbs name={name}/>
            <PersonDetailsHeader person={person}/>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Personal Details Section */}
                <section>
                    <SectionHeader srOnly={true}>Personal Details</SectionHeader>
                    <PersonDetailsCard person={person}/>
                </section>

                {/* Movie Credits Section */}
                <section className="md:col-span-2">
                    <SectionHeader>Movie Credits</SectionHeader>
                    <PersonDetailsCreditOverview
                        personName={name}
                        creditsByRole={creditsByRole}
                    />
                </section>
            </div>

            {/* Hidden admin panels for editing, profile image upload, and deletion */}
            <PageSection srTitle="Edit Person" className="hidden">
                <PersonSubmitFormPanel
                    isEditing={true}
                    entity={person}
                    presetOpen={isEditing}
                    setPresetOpen={setIsEditing}
                    onSubmitSuccess={replaceOnUpdate}
                />
            </PageSection>

            <PageSection srTitle="Upload Person Profile Image" className="hidden">
                <UploadPersonProfileImageFormPanel
                    personID={_id}
                    presetOpen={isUpdatingProfileImage}
                    setPresetOpen={setIsUpdatingProfileImage}
                />
            </PageSection>

            <PageSection srTitle="Warning Dialog For Deleting Person" className="hidden">
                <PersonDeleteWarningDialog
                    personName={name}
                    personID={_id}
                    onDeleteSuccess={navigateToPersonIndex}
                    presetOpen={isDeletingPerson}
                    setPresetOpen={setIsDeletingPerson}
                />
            </PageSection>
        </PageFlexWrapper>
    );
};

export default PersonDetailsPageContent;
