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
import useFetchPerson from "@/pages/persons/hooks/fetch/useFetchPerson.ts";
import useFetchGroupedMovieCreditsForPerson
    from "@/pages/moviecredit/hooks/queries/useFetchGroupedMovieCreditsForPerson.ts";
import {PersonDetailsSchema} from "@/pages/persons/schema/person/Person.schema.ts";
import PersonDetailsUIProvider from "@/pages/persons/providers/PersonDetailsUIProvider.tsx";
import MultiQueryDataLoader from "@/common/components/query/loaders/MultiQueryDataLoader.tsx";
import {QueryDefinition} from "@/common/type/query/loader/MultiQuery.types.ts";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {IDRouteParamSchema} from "@/common/schema/route-params/IDRouteParamSchema.ts";
import {
    MovieCreditDetailsExceptPersonByRoleArraySchema
} from "@/pages/moviecredit/schemas/model/MovieCreditGroup.schema.ts";
import PersonDetailsPageContent, {
    PersonDetailsPageContentProps
} from "@/pages/persons/pages/details/PersonDetailsPageContent.tsx";

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
    const {_id: personID} = useFetchByIdentifierRouteParams({
        schema: IDRouteParamSchema,
        sourceComponent: PersonDetailsPage.name,
        errorTo: "/admin/persons",
        errorMessage: "Invalid Person Identifier."
    }) ?? {};

    if (!personID) {
        return <PageLoader/>;
    }

    const personQuery = useFetchPerson({_id: personID, config: {populate: true, virtuals: true}});
    const creditQuery = useFetchGroupedMovieCreditsForPerson({personID, limit: 10});

    const queries: QueryDefinition[] = [
        {
            key: "person",
            query: personQuery,
            schema: PersonDetailsSchema,
        },
        {
            key: "creditsByRole",
            query: creditQuery,
            schema: MovieCreditDetailsExceptPersonByRoleArraySchema,
        },
    ];

    return (
        <PersonDetailsUIProvider>
            <MultiQueryDataLoader queries={queries}>
                {(data) => <PersonDetailsPageContent {...data as PersonDetailsPageContentProps}/>}
            </MultiQueryDataLoader>
        </PersonDetailsUIProvider>
    );
};

export default PersonDetailsPage;
