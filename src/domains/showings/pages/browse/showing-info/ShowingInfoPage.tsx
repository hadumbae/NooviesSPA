/**
 * @file Top-level route component for displaying detailed information about a specific Showing.
 * @filename ShowingInfoPage.tsx
 */

import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {PageLoader} from "@/views/common/_comp/page";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import useFetchShowingBySlug from "@/domains/showings/hooks/queries/useFetchShowingBySlug.ts";
import ShowingInfoPageContent from "@/domains/showings/pages/browse/showing-info/ShowingInfoPageContent.tsx";
import {ShowingDetails, ShowingDetailsSchema} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";

/**
 * Orchestrates the data fetching and validation for the Showing details view.
 */
const ShowingInfoPage = () => {
    /** Extracts the URL identifier with integrated validation and redirection logic. */
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        sourceComponent: ShowingInfoPage.name,
        errorTo: "/",
        errorMessage: "Invalid Showing identifier.",
    }) ?? {};

    /** Fallback state if the slug is not yet available or invalid. */
    if (!slug) {
        return <PageLoader/>;
    }

    /** Primary query for fetching the domain entity by its slug. */
    const query = useFetchShowingBySlug({
        slug,
        config: {populate: true, virtuals: true}
    });

    return (
        <ValidatedDataLoader query={query} schema={ShowingDetailsSchema}>
            {(showing: ShowingDetails) => (
                <ShowingInfoPageContent showing={showing}/>
            )}
        </ValidatedDataLoader>
    );
};

export default ShowingInfoPage;