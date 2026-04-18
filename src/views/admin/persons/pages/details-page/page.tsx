/**
 * @fileoverview Route-level page for displaying detailed information about a single Person.
 * Orchestrates data fetching for biographical details and grouped movie credits.
 */

import {ReactElement} from 'react';
import {PageLoader} from "@/views/common/_comp/page";
import {
    useFetchGroupedMovieCreditsForPerson
} from "@/domains/moviecredit/_feat/role-credit-groups/useFetchGroupedMovieCreditsForPerson.ts";
import {PersonDetailsSchema} from "@/domains/persons/schema/person/Person.schema.ts";
import PersonDetailsUIProvider from "@/domains/persons/context/PersonDetailsUIProvider.tsx";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {
    MovieCreditDetailsExceptPersonByRoleArraySchema
} from "@/domains/moviecredit/_feat/role-credit-groups/MovieCreditGroup.schema.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {useFetchPersonBySlug} from "@/domains/persons/_feat/crud-hooks";
import {PersonDetailsPageContent} from "@/views/admin/persons/pages/details-page/content.tsx";

/**
 * Page component for rendering a person's detailed profile.
 */
export function PersonDetailsPage(): ReactElement {
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
                            {(credits) => (
                                <PersonDetailsPageContent
                                    person={person}
                                    creditsByRole={credits}
                                />
                            )}
                        </ValidatedDataLoader>
                    );
                }}
            </QueryDataLoader>
        </PersonDetailsUIProvider>
    );
}