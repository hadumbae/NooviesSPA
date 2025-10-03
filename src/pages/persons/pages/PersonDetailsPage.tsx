import {FC} from 'react';
import useFetchPersonParams from "@/pages/persons/hooks/params/admin/useFetchPersonParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import PersonDetailsHeader from "@/pages/persons/components/admin/person-details/PersonDetailsHeader.tsx";
import PersonDetailsBreadcrumbs from "@/pages/persons/components/admin/person-details/PersonDetailsBreadcrumbs.tsx";
import useFetchPerson from "@/pages/persons/hooks/fetch/useFetchPerson.ts";
import useFetchGroupedMovieCreditsForPerson
    from "@/pages/moviecredit/hooks/queries/useFetchGroupedMovieCreditsForPerson.ts";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import {CombinedSchemaQuery} from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";
import {PersonDetailsSchema} from "@/pages/persons/schema/person/Person.schema.ts";
import {PersonDetails} from "@/pages/persons/schema/person/Person.types.ts";
import PersonDetailsCard from "@/pages/persons/components/admin/person-details/PersonDetailsCard.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import PersonDetailsUIProvider from "@/pages/persons/providers/PersonDetailsUIProvider.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {PersonDetailsUIContext} from "@/pages/persons/context/PersonDetailsUIContext.ts";
import UploadPersonProfileImageFormPanel
    from "@/pages/persons/components/form/admin/profile-image/UploadPersonProfileImageFormPanel.tsx";
import PersonDeleteWarningDialog from "@/pages/persons/components/admin/dialog/PersonDeleteWarningDialog.tsx";
import useLoggedNavigate from "@/common/hooks/useLoggedNavigate.ts";
import PersonSubmitFormPanel from "@/pages/persons/components/form/admin/submit/PersonSubmitFormPanel.tsx";
import {
    MovieCreditDetailsExceptPersonByRoleArraySchema
} from "@/pages/moviecredit/schemas/model/MovieCreditGroup.schema.ts";
import {
    MovieCreditDetailsExceptPersonGroupedByRoleArray
} from "@/pages/moviecredit/schemas/model/MovieCreditGroup.types.ts";
import PersonDetailsCreditOverview from "@/pages/persons/components/admin/person-details/credit-overview/PersonDetailsCreditOverview.tsx";

type QueryData = {
    /** Detailed information about the person fetched from the backend */
    person: PersonDetails;

    /** Person's movie credits grouped by role type and department */
    creditsByRole: MovieCreditDetailsExceptPersonGroupedByRoleArray;
};

/**
 * Page component displaying a `Person`'s full details along with a preview of their movie credits.
 *
 * Responsibilities:
 * - Fetches the `personID` from URL parameters using {@link useFetchPersonParams}.
 * - Retrieves full `Person` details via {@link useFetchPerson}.
 * - Fetches the person's movie credits grouped by role type via {@link useFetchGroupedMovieCreditsForPerson}.
 * - Wraps asynchronous data fetching in {@link CombinedQueryBoundary} and {@link CombinedValidatedQueryBoundary} to handle loading states and schema validation.
 * - Provides a UI context via {@link PersonDetailsUIProvider} to manage editing, profile image updates, and deletion state.
 * - Displays:
 *   - Breadcrumbs and header
 *   - Personal details card
 *   - Movie credits overview
 *   - Hidden sections for editing, uploading profile images, and delete confirmation dialogs
 *
 * Validation:
 * - Person details are validated using {@link PersonDetailsSchema}.
 * - Movie credits are validated using {@link MovieCreditDetailsExceptPersonByRoleArraySchema}.
 *
 * @example
 * ```tsx
 * <PersonDetailsPage />
 * ```
 */
const PersonDetailsPage: FC = () => {
    const urlParams = useFetchPersonParams();
    if (!urlParams) return <PageLoader/>;

    const {personID} = urlParams;

    // Fetch queries
    const personQuery = useFetchPerson({_id: personID, populate: true, virtuals: true});
    const creditQuery = useFetchGroupedMovieCreditsForPerson({personID, limit: 10});

    const queries = [personQuery, creditQuery];

    const validationQueries: CombinedSchemaQuery[] = [
        {key: "person", query: personQuery, schema: PersonDetailsSchema},
        {key: "creditsByRole", query: creditQuery, schema: MovieCreditDetailsExceptPersonByRoleArraySchema},
    ];

    return (
        <PersonDetailsUIProvider>
            <CombinedQueryBoundary queries={queries}>
                <CombinedValidatedQueryBoundary queries={validationQueries}>
                    {(data) => {
                        const {person, creditsByRole} = data as QueryData;
                        const {name} = person;

                        const navigate = useLoggedNavigate();

                        const {
                            isEditing,
                            setIsEditing,
                            isUpdatingProfileImage,
                            setIsUpdatingProfileImage,
                            isDeletingPerson,
                            setIsDeletingPerson,
                        } = useRequiredContext({context: PersonDetailsUIContext});

                        const onDelete = () => {
                            navigate({
                                to: "/admin/persons",
                                component: PersonDetailsHeader.name,
                                message: "Navigation on person deletion."
                            });
                        };

                        return (
                            <PageFlexWrapper>
                                <PersonDetailsBreadcrumbs name={name}/>
                                <PersonDetailsHeader person={person}/>

                                <PageSection srTitle="Personal Details">
                                    <PersonDetailsCard person={person}/>
                                </PageSection>

                                <PageSection srTitle="Movie Credits" title="Movie Credits">
                                    <PersonDetailsCreditOverview
                                        personName={name}
                                        creditsByRole={creditsByRole}
                                    />
                                </PageSection>

                                {/* Hidden admin sections */}
                                <PageSection srTitle="Edit Person" className="hidden">
                                    <PersonSubmitFormPanel
                                        isEditing={true}
                                        entity={person}
                                        presetOpen={isEditing}
                                        setPresetOpen={setIsEditing}
                                    />
                                </PageSection>

                                <PageSection srTitle="Upload Person Profile Image" className="hidden">
                                    <UploadPersonProfileImageFormPanel
                                        personID={person._id}
                                        presetOpen={isUpdatingProfileImage}
                                        setPresetOpen={setIsUpdatingProfileImage}
                                    />
                                </PageSection>

                                <PageSection srTitle="Warning Dialog For Deleting Person" className="hidden">
                                    <PersonDeleteWarningDialog
                                        personName={name}
                                        personID={personID}
                                        onDeleteSuccess={onDelete}
                                        presetOpen={isDeletingPerson}
                                        setPresetOpen={setIsDeletingPerson}
                                    />
                                </PageSection>
                            </PageFlexWrapper>
                        );
                    }}
                </CombinedValidatedQueryBoundary>
            </CombinedQueryBoundary>
        </PersonDetailsUIProvider>
    );
};

export default PersonDetailsPage;
