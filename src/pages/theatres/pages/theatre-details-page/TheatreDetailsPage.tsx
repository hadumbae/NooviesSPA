/**
 * @file TheatreDetailsPage.tsx
 *
 * Admin page for displaying full details of a single theatre.
 *
 * Responsibilities:
 * - Validate and extract the theatre slug from route params
 * - Fetch theatre details with populated relations and virtual fields
 * - Runtime-validate the API response
 * - Provide UI-level context for the details view
 * - Delegate rendering to the page content component
 */

import {FC} from 'react';
import PageLoader from "@/common/components/page/PageLoader.tsx";
import {TheatreDetailsSchema} from "@/pages/theatres/schema/model/theatre/Theatre.schema.ts";
import {TheatreDetails} from "@/pages/theatres/schema/model/theatre/Theatre.types.ts";
import TheatreDetailsPageContent from "@/pages/theatres/pages/theatre-details-page/TheatreDetailsPageContent.tsx";
import TheatreDetailsUIContextProvider
    from "@/pages/theatres/context/theatre-details-ui/TheatreDetailsUIContextProvider.tsx";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import useFetchTheatreBySlug from "@/pages/theatres/hooks/fetch-theatre/useFetchTheatreBySlug.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";

/**
 * **TheatreDetailsPage**
 *
 * Admin entry point for the Theatre Details view.
 *
 * Flow:
 * 1. Parse and validate `slug` from route params
 * 2. Redirect to index on route parse failure
 * 3. Fetch theatre details by slug
 * 4. Validate API response at runtime
 * 5. Provide UI context
 * 6. Delegate rendering to {@link TheatreDetailsPageContent}
 *
 * Validation:
 * - Route params validated via {@link SlugRouteParamSchema}
 * - API response enforced via {@link TheatreDetailsSchema}
 *
 * @component
 *
 * @example
 * ```tsx
 * <TheatreDetailsPage />
 * ```
 */
const TheatreDetailsPage: FC = () => {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/theatres",
        sourceComponent: TheatreDetailsPage.name,
    }) ?? {};

    if (!slug) {
        return <PageLoader />;
    }

    const query = useFetchTheatreBySlug({
        slug,
        config: {populate: true, virtuals: true},
    });

    return (
        <TheatreDetailsUIContextProvider>
            <ValidatedDataLoader
                query={query}
                schema={TheatreDetailsSchema}
            >
                {(theatre: TheatreDetails) => (
                    <TheatreDetailsPageContent theatre={theatre} />
                )}
            </ValidatedDataLoader>
        </TheatreDetailsUIContextProvider>
    );
};

export default TheatreDetailsPage;
