/**
 * @file TheatreDetailsScreenTab.tsx
 * @description
 * React component that displays an overview of screens for a specific theatre.
 *
 * Features:
 * - Fetches paginated screen data for a given theatre ID using `useFetchScreens`.
 * - Handles loading, error, and validation states via `QueryBoundary` and `ValidatedQueryBoundary`.
 * - Renders screen items using `TheatreDetailsScreenTabContent`.
 * - Supports pagination controls and optional styling overrides.
 * - Accepts query filters and sort options via `ScreenQueryOptions`.
 *
 * @example
 * ```tsx
 * <TheatreDetailsScreenTab
 *   theatreID="64f123abc1234567890abcdef"
 *   page={1}
 *   perPage={10}
 *   setPage={setPage}
 *   queries={{ active: true }}
 *   classNames={{ container: "custom-container", list: "custom-list" }}
 * />
 * ```
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
import TheatreDetailsScreenTabContent
    from "@/pages/screens/components/theatre-screen/admin/tabs/TheatreDetailsScreenTabContent.tsx";

/**
 * Props for the `TheatreDetailsScreenTab` component.
 */
export type OverviewTabProps = {
    /** The ID of the theatre whose screens are being displayed */
    theatreID: ObjectId;

    /** Current page number for pagination */
    page: number;

    /** Number of items to display per page */
    perPage: number;

    /** Callback to update the current page number */
    setPage: (val: number) => void;

    /** Optional query filters and sorts to apply when fetching screens */
    queries?: ScreenQueryOptions;

    /** Optional CSS class overrides */
    classNames?: {
        /** Class applied to the container element */
        container?: string;

        /** Class applied to the screen list element */
        list?: string;
    };
};

/**
 * Displays a paginated overview of screens for a specific theatre.
 *
 * Handles fetching, validation, loading, and error states automatically.
 *
 * @param props - Props controlling theatre ID, pagination, query filters, and styling.
 * @returns JSX element rendering the screens overview tab.
 *
 * @example
 * ```tsx
 * const [page, setPage] = useState(1);
 * <TheatreDetailsScreenTab
 *   theatreID="64f123abc1234567890abcdef"
 *   page={page}
 *   perPage={10}
 *   setPage={setPage}
 *   queries={{ active: true }}
 *   classNames={{ container: "custom-container", list: "custom-list" }}
 * />
 * ```
 */
const TheatreDetailsScreenTab: FC<OverviewTabProps> = (props) => {
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
                    <TheatreDetailsScreenTabContent
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

export default TheatreDetailsScreenTab;
