/**
 * @file PersonImagePage.tsx
 *
 * Page component for editing a person's profile image.
 * Handles routing, data fetching, validation, and loading states.
 */

import {FC} from 'react';
import {PageLoader} from "@/views/common/_comp/page";
import {PersonDetailsSchema} from "@/domains/persons/schema/person/Person.schema.ts";
import {PersonDetails} from "@/domains/persons/schema/person/Person.types.ts";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import PersonImagePageContent from "@/views/admin/persons/pages/image-page/PersonImagePageContent.tsx";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {useFetchPersonBySlug} from "@/domains/persons/_feat/crud-hooks";

/**
 * **Person Image Page**
 *
 * Top-level page for managing a person's profile image.
 *
 * @remarks
 * - Resolves the person ID from route parameters.
 * - Fetches the corresponding person entity.
 * - Validates the response using {@link PersonDetailsSchema}.
 * - Delegates rendering to {@link PersonImagePageContent}.
 *
 * @example
 * ```tsx
 * <PersonImagePage />
 * ```
 */
const PersonImagePage: FC = () => {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        sourceComponent: PersonImagePage.name,
        errorTo: "/admin/persons",
        errorMessage: "Invalid Person Identifier."
    }) ?? {};

    const query = useFetchPersonBySlug({
        slug: slug!,
        schema: PersonDetailsSchema,
        config: {populate: true, virtuals: true},
        options: {enabled: !!slug},
    });

    if (!slug) {
        return <PageLoader/>;
    }

    return (
        <QueryDataLoader query={query}>
            {(person: PersonDetails) => <PersonImagePageContent person={person}/>}
        </QueryDataLoader>
    );
};

export default PersonImagePage;
