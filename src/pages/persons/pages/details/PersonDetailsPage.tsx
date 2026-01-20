/**
 * @file PersonDetailsPage.tsx
 *
 * Route-level page for displaying detailed information about a single `Person`.
 *
 * Responsibilities:
 * - Resolves the person ID from route/search params
 * - Fetches person details and grouped movie credits in parallel
 * - Validates all fetched data before rendering
 * - Provides UI state context for editing and destructive actions
 */

import {FC} from 'react';
import PageLoader from "@/common/components/page/PageLoader.tsx";
import {useFetchGroupedMovieCreditsForPerson}
    from "@/pages/moviecredit/hooks/queries/useFetchGroupedMovieCreditsForPerson.ts";
import {PersonDetailsSchema} from "@/pages/persons/schema/person/Person.schema.ts";
import PersonDetailsUIProvider from "@/pages/persons/providers/PersonDetailsUIProvider.tsx";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {
    MovieCreditDetailsExceptPersonByRoleArraySchema
} from "@/pages/moviecredit/schemas/model/MovieCreditGroup.schema.ts";
import PersonDetailsPageContent from "@/pages/persons/pages/details/PersonDetailsPageContent.tsx";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {useFetchPersonBySlug} from "@/pages/persons/hooks/fetch/useFetchPersonBySlug.ts";

/**
 * Page component for rendering a person's detailed profile.
 *
 * Data flow:
 * - Person metadata → `useFetchPerson`
 * - Movie credits grouped by role → `useFetchGroupedMovieCreditsForPerson`
 *
 * All queries are validated before rendering via `MultiQueryDataLoader`.
 */
const PersonDetailsPage: FC = () => {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        sourceComponent: PersonDetailsPage.name,
        errorTo: "/admin/persons",
        errorMessage: "Invalid Person Identifier."
    }) ?? {};

    if (!slug) {
        return <PageLoader/>;
    }

    const personQuery = useFetchPersonBySlug({slug, config: {populate: true, virtuals: true}});

    return (
        <PersonDetailsUIProvider>
            <ValidatedDataLoader query={personQuery} schema={PersonDetailsSchema}>
                {(person) => {
                    const creditQuery = useFetchGroupedMovieCreditsForPerson({
                        personID: person._id,
                        config: {limit: 10}
                    });

                    return (
                        <ValidatedDataLoader
                            query={creditQuery}
                            schema={MovieCreditDetailsExceptPersonByRoleArraySchema}
                        >
                            {(credits) => <PersonDetailsPageContent person={person} creditsByRole={credits}/>}
                        </ValidatedDataLoader>
                    );
                }}
            </ValidatedDataLoader>
        </PersonDetailsUIProvider>
    );
};

export default PersonDetailsPage;
