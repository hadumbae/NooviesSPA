/**
 * @file TheatreShowingCreatePage.tsx
 *
 * @summary
 * Admin page for creating a new showing under a specific theatre.
 */

import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import {TheatreSchema} from "@/pages/theatres/schema/model/theatre/Theatre.schema.ts";
import {Theatre} from "@/pages/theatres/schema/model/theatre/Theatre.types.ts";
import TheatreShowingCreatePageContent
    from "@/pages/theatres/pages/theatre-showings/TheatreShowingCreatePageContent.tsx";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import useFetchTheatreBySlug from "@/pages/theatres/hooks/fetch-theatre/useFetchTheatreBySlug.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";

/**
 * Page component for creating a new showing for a theatre.
 *
 * Responsibilities:
 * - Resolve and validate theatre ID from route params
 * - Fetch and validate theatre data
 * - Delegate rendering to the page content component
 *
 * @returns Theatre showing creation page
 */
const TheatreShowingCreatePage = () => {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/theatres",
        sourceComponent: TheatreShowingCreatePage.name,
    }) ?? {};

    if (!slug) {
        return <PageLoader/>;
    }

    const query = useFetchTheatreBySlug({slug});

    return (
        <ValidatedDataLoader query={query} schema={TheatreSchema}>
            {(theatre: Theatre) => <TheatreShowingCreatePageContent theatre={theatre}/>}
        </ValidatedDataLoader>
    );
};

export default TheatreShowingCreatePage;
