/**
 * @file TheatreDetailsScreensTab.tsx
 *
 * Paginated screen overview tab for a specific theatre.
 *
 * Responsibilities:
 * - Fetches paginated screen data scoped to a theatre
 * - Handles loading and error states via `QueryBoundary`
 * - Validates responses using `ValidatedQueryBoundary`
 * - Renders screen results with `TheatreDetailsScreensTabContent`
 * - Exposes pagination controls and optional query filters
 *
 * Intended for use within `TheatreDetailsPageTabs`.
 */

import {FC} from "react";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {PaginatedScreenDetailsSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {PaginatedScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";
import {ScreenQueryOptions} from "@/pages/screens/schema/queries/ScreenQueryOptions.types.ts";
import TheatreDetailsScreensTabContent
    from "@/pages/theatres/pages/theatre-details-page/tabs/TheatreDetailsScreensTabContent.tsx";
import useFetchPaginatedScreens from "@/pages/screens/hooks/screens/fetch-screens/useFetchPaginatedScreens.ts";

/**
 * Props for {@link TheatreDetailsScreensTab}.
 */
export type OverviewTabProps = {
    /**
     * ID of the theatre whose screens are displayed.
     */
    theatreID: ObjectId;

    /**
     * Current pagination page.
     */
    page: number;

    /**
     * Number of screens to fetch per page.
     */
    perPage: number;

    /**
     * Updates the pagination page.
     */
    setPage: (val: number) => void;

    /**
     * Optional query filters and sorting rules.
     */
    queries?: ScreenQueryOptions;

    /**
     * Optional CSS class overrides.
     */
    classNames?: {
        /**
         * Class for the outer container.
         */
        container?: string;

        /**
         * Class for the screen list.
         */
        list?: string;
    };
};

/**
 * # TheatreDetailsScreensTab Component
 *
 * Displays a paginated list of screens for a given theatre.
 *
 * Integrates:
 * - **useFetchPaginatedScreens** for data fetching
 * - **QueryBoundary** for loading and error handling
 * - **ValidatedQueryBoundary** for runtime data validation
 *
 * @param props
 * Component props. See {@link OverviewTabProps}.
 *
 * @example
 * ```tsx
 * const [page, setPage] = useState(1);
 *
 * <TheatreDetailsScreensTab
 *   theatreID={theatreId}
 *   page={page}
 *   perPage={10}
 *   setPage={setPage}
 *   queries={{ active: true }}
 * />
 * ```
 */
const TheatreDetailsScreensTab: FC<OverviewTabProps> = (props) => {
    const {theatreID, page, perPage, setPage, classNames, queries} = props;

    const screenQuery = useFetchPaginatedScreens({
        page,
        perPage,
        config: {populate: true, virtuals: true},
        queries: {...queries, theatre: theatreID},
    });

    return (
        <QueryBoundary query={screenQuery} errorComponent={ErrorMessageDisplay}>
            <ValidatedQueryBoundary
                query={screenQuery}
                schema={PaginatedScreenDetailsSchema}
                message="Invalid data received. Please try again."
                errorComponent={ErrorMessageDisplay}
            >
                {({items, totalItems}: PaginatedScreenDetails) => (
                    <TheatreDetailsScreensTabContent
                        theatreID={theatreID}
                        screens={items}
                        totalItems={totalItems}
                        paginationOptions={{page, perPage, setPage}}
                        classNames={classNames}
                    />
                )}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default TheatreDetailsScreensTab;
