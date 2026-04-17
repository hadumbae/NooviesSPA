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
import {PageLoader} from "@/views/common/_comp/page";
import {useFetchGroupedMovieCreditsForPerson}
    from "@/domains/moviecredit/hooks/queries/useFetchGroupedMovieCreditsForPerson.ts";
import {PersonDetailsSchema} from "@/domains/persons/schema/person/Person.schema.ts";
import PersonDetailsUIProvider from "@/domains/persons/context/PersonDetailsUIProvider.tsx";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {
    MovieCreditDetailsExceptPersonByRoleArraySchema
} from "@/domains/moviecredit/schemas/model/movie-credit-grouped-schema/MovieCreditGroup.schema.ts";
import PersonDetailsPageContent from "@/views/admin/persons/pages/details-page/PersonDetailsPageContent.tsx";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {useFetchPersonBySlug} from "@/domains/persons/_feat/crud-hooks";

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

    const personQuery = useFetchPersonBySlug({
        slug: slug!,
        schema: PersonDetailsSchema,
        config: {populate: true, virtuals: true},
        options: {enabled: !!slug},
    });

    if (!slug) {
        return <PageLoader/>;
    }

    return (
        <PersonDetailsUIProvider>
            <QueryDataLoader query={personQuery}>
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
            </QueryDataLoader>
        </PersonDetailsUIProvider>
    );
};

export default PersonDetailsPage;
