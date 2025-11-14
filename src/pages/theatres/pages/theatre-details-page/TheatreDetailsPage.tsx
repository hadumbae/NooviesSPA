import {FC} from 'react';
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useFetchTheatre from "@/pages/theatres/hooks/query/useFetchTheatre.ts";
import {TheatreDetailsSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import useFetchRouteParams from "@/common/hooks/router/useFetchRouteParams.ts";
import {TheatreDetailsRouteParamSchema} from "@/pages/theatres/schema/params/TheatreDetailsRouteParamSchema.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import TheatreDetailsPageContent from "@/pages/theatres/pages/theatre-details-page/TheatreDetailsPageContent.tsx";

/**
 * Page component displaying detailed information for a single theatre.
 *
 * Features:
 * - Breadcrumbs and header with actions (e.g., delete theatre)
 * - Theatre details card
 * - Tabs for managing associated screens and showings
 * - Fetches theatre data and validates it against `TheatreDetailsSchema`
 * - Handles loading and invalid data states gracefully
 *
 * @remarks
 * - Uses `useFetchTheatreDetailsParams` to extract `theatreID` from URL or context
 * - Uses `QueryBoundary` and `ValidatedQueryBoundary` to handle async fetching and schema validation
 * - Includes `TheatreScreensOverviewTab` with pagination and sorting for screens
 *
 * @example
 * ```tsx
 * <TheatreDetailsPage />
 * ```
 */
const TheatreDetailsPage: FC = () => {
    // ⚡ Navigation ⚡

    const navigate = useLoggedNavigate();
    const navigateToIndex = () => navigate({to: "/admin/theatres"})

    // ⚡ Fetch Route Params ⚡

    const {theatreID} = useFetchRouteParams({
        schema: TheatreDetailsRouteParamSchema,
        onError: navigateToIndex,
        onErrorMessage: "Failed to parse route parameters.",
    }) ?? {};

    if (!theatreID) {
        return <PageLoader/>;
    }

    // ⚡ Query ⚡

    const query = useFetchTheatre({
        _id: theatreID,
        populate: true,
        virtuals: true,
    });

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={TheatreDetailsSchema} message={"Invalid theatre data."}>
                {(theatre: TheatreDetails) => <TheatreDetailsPageContent theatre={theatre}/>}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default TheatreDetailsPage;
