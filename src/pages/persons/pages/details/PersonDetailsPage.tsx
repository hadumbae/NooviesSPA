import {FC} from 'react';
import useFetchPersonParams from "@/pages/persons/hooks/params/admin/useFetchPersonParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useFetchPerson from "@/pages/persons/hooks/fetch/useFetchPerson.ts";
import useFetchGroupedMovieCreditsForPerson
    from "@/pages/moviecredit/hooks/queries/useFetchGroupedMovieCreditsForPerson.ts";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import {CombinedSchemaQuery} from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";
import {PersonDetailsSchema} from "@/pages/persons/schema/person/Person.schema.ts";
import PersonDetailsUIProvider from "@/pages/persons/providers/PersonDetailsUIProvider.tsx";
import {
    MovieCreditDetailsExceptPersonByRoleArraySchema
} from "@/pages/moviecredit/schemas/model/MovieCreditGroup.schema.ts";
import PersonDetailsPageContent, {
    PersonDetailsPageContentProps
} from "@/pages/persons/pages/details/PersonDetailsPageContent.tsx";

/**
 * **Person Details Page**
 *
 * Top-level page component for displaying a single person's detailed profile.
 *
 * @remarks
 * - Fetches person details and grouped movie credits in parallel using React Query hooks:
 *   - {@link useFetchPerson} for person metadata
 *   - {@link useFetchGroupedMovieCreditsForPerson} for grouped movie credits
 * - Validates the fetched data using:
 *   - {@link PersonDetailsSchema} for person details
 *   - {@link MovieCreditDetailsExceptPersonByRoleArraySchema} for movie credits
 * - Uses a combined query boundary approach:
 *   - {@link CombinedQueryBoundary} handles asynchronous query loading and errors
 *   - {@link CombinedValidatedQueryBoundary} validates the returned data before rendering
 * - Wraps content in {@link PersonDetailsUIProvider} to provide UI state context for:
 *   - Editing mode
 *   - Profile image updates
 *   - Deletion confirmation
 * - Renders the main page content via {@link PersonDetailsPageContent}.
 *
 * @example
 * ```tsx
 * <PersonDetailsPage />
 * ```
 */
const PersonDetailsPage: FC = () => {
    const {personID} = useFetchPersonParams() ?? {};
    if (!personID) return <PageLoader/>;

    // ⚡ Queries ⚡
    const personQuery = useFetchPerson({_id: personID, populate: true, virtuals: true});
    const creditQuery = useFetchGroupedMovieCreditsForPerson({personID, limit: 10});

    const queries = [personQuery, creditQuery];

    // ⚡ Validation ⚡
    const validationQueries: CombinedSchemaQuery[] = [
        {key: "person", query: personQuery, schema: PersonDetailsSchema},
        {key: "creditsByRole", query: creditQuery, schema: MovieCreditDetailsExceptPersonByRoleArraySchema},
    ];

    return (
        <PersonDetailsUIProvider>
            <CombinedQueryBoundary queries={queries}>
                <CombinedValidatedQueryBoundary queries={validationQueries}>
                    {(data) => <PersonDetailsPageContent {...data as PersonDetailsPageContentProps} />}
                </CombinedValidatedQueryBoundary>
            </CombinedQueryBoundary>
        </PersonDetailsUIProvider>
    );
};

export default PersonDetailsPage;
