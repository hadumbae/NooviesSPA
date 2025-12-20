/**
 * @file TheatreRecentShowingList.tsx
 *
 * @summary
 * Data-fetching wrapper for a theatre’s recent active showings.
 */

import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import { ShowingDetailsArraySchema } from "@/pages/showings/schema/showing/Showing.schema.ts";
import { ShowingDetailsArray } from "@/pages/showings/schema/showing/Showing.types.ts";
import useFetchShowings from "@/pages/showings/hooks/queries/useFetchShowings.ts";
import TheatreRecentShowingListContent
    from "@/pages/theatres/components/admin/theatre-showings/TheatreRecentShowingListContent.tsx";

/**
 * Props for {@link TheatreRecentShowingList}.
 */
type ContentProps = {
    /** Theatre identifier used to scope the query */
    theatreID: ObjectId;
};

/**
 * Fetches and renders recent scheduled showings for a theatre.
 *
 * Responsibilities:
 * - Fetch active, scheduled showings with a fixed limit
 * - Validate the response schema
 * - Delegate rendering to the presentation component
 *
 * @param props - Component props
 * @returns Recent theatre showing list
 */
const TheatreRecentShowingList = ({ theatreID }: ContentProps) => {
    const query = useFetchShowings({
        requestOptions: { populate: true, virtuals: true, limit: 10 },
        queries: {
            theatre: theatreID,
            sortByStartTime: 1,
            status: "SCHEDULED",
            isActive: true,
        },
    });

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={ShowingDetailsArraySchema}>
                {(showings: ShowingDetailsArray) => (
                    <TheatreRecentShowingListContent
                        theatreID={theatreID}
                        showings={showings}
                    />
                )}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default TheatreRecentShowingList;
