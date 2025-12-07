/**
 * @file TheatreDetailsScreensTab.tsx
 * @description
 * Paginated screen overview for a specific theatre.
 *
 * This component:
 * - Fetches paginated screen data via `useFetchScreens`
 * - Wraps fetching + validation with `QueryBoundary` and `ValidatedQueryBoundary`
 * - Renders screen results using `TheatreDetailsScreensTabContent`
 * - Exposes pagination + optional query filters
 * - Supports optional className overrides
 *
 * Designed for use inside `TheatreDetailsPageTabs`.
 */

import { FC } from 'react';
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import useFetchScreens from "@/pages/screens/hooks/screens/fetch-screens/useFetchScreens.ts";
import { PaginatedScreenDetailsSchema } from "@/pages/screens/schema/screen/Screen.schema.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import { PaginatedScreenDetails } from "@/pages/screens/schema/screen/Screen.types.ts";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";
import { ScreenQueryOptions } from "@/pages/screens/schema/queries/ScreenQueryOptions.types.ts";
import TheatreDetailsScreensTabContent
    from "@/pages/theatres/pages/theatre-details-page/tabs/TheatreDetailsScreensTabContent.tsx";

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
        /** Class for the outer container. */
        container?: string;

        /** Class for the list of screens. */
        list?: string;
    };
};

/**
 * Displays a paginated overview of screens for a theatre.
 *
 * Handles:
 * - Fetching (via `useFetchScreens`)
 * - Validation (via `ValidatedQueryBoundary`)
 * - Error and loading states (via `QueryBoundary`)
 *
 * Renders the screen list through {@link TheatreDetailsScreensTabContent}.
 *
 * @param props - See {@link OverviewTabProps}
 *
 * @example
 * ```tsx
 * const [page, setPage] = useState(1);
 *
 * <TheatreDetailsScreensTab
 *   theatreID="64f123abc1234567890abcdef"
 *   page={page}
 *   perPage={10}
 *   setPage={setPage}
 *   queries={{ active: true }}
 *   classNames={{ container: "custom-container", list: "custom-list" }}
 * />
 * ```
 */
const TheatreDetailsScreensTab: FC<OverviewTabProps> = (props) => {
    const { theatreID, page, perPage, setPage, classNames, queries } = props;

    const screenQuery = useFetchScreens({
        theatre: theatreID,
        paginated: true,
        virtuals: true,
        populate: true,
        page,
        perPage,
        ...queries
    });

    return (
        <QueryBoundary query={screenQuery} errorComponent={ErrorMessageDisplay}>
            <ValidatedQueryBoundary
                query={screenQuery}
                schema={PaginatedScreenDetailsSchema}
                message="Invalid data received. Please try again."
                errorComponent={ErrorMessageDisplay}
            >
                {({ items, totalItems }: PaginatedScreenDetails) =>
                    <TheatreDetailsScreensTabContent
                        theatreID={theatreID}
                        screens={items}
                        totalItems={totalItems}
                        paginationOptions={{ page, perPage, setPage }}
                        classNames={classNames}
                    />}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default TheatreDetailsScreensTab;
