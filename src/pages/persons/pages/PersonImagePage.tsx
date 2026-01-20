/**
 * @file PersonImagePage.tsx
 *
 * Page component for editing a person's profile image.
 * Handles routing, data fetching, validation, and loading states.
 */

import {FC} from 'react';
import PageLoader from "@/common/components/page/PageLoader.tsx";
import {PersonDetailsSchema} from "@/pages/persons/schema/person/Person.schema.ts";
import {PersonDetails} from "@/pages/persons/schema/person/Person.types.ts";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import PersonImagePageContent from "@/pages/persons/pages/image-page/PersonImagePageContent.tsx";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {useFetchPersonBySlug} from "@/pages/persons/hooks/fetch/useFetchPersonBySlug.ts";

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

    if (!slug) {
        return <PageLoader/>;
    }

    const query = useFetchPersonBySlug({
        slug,
        config: {populate: true, virtuals: true},
    });

    return (
        <ValidatedDataLoader query={query} schema={PersonDetailsSchema}>
            {(person: PersonDetails) => <PersonImagePageContent person={person}/>}
        </ValidatedDataLoader>
    );
};

export default PersonImagePage;
