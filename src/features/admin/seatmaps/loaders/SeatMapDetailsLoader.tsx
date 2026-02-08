/**
 * @file SeatMapDetailsLoader.tsx
 *
 * Data loader component for fetching and validating populated seat map details
 * for a specific showing.
 *
 * Wraps the seat map query with schema validation and exposes the resolved
 * `SeatMapDetails[]` via a render prop.
 */

import {SeatMapQueryOptions} from "@/pages/seatmap/schema/query-options/SeatMapQueryOptions.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import useFetchSeatMaps from "@/pages/seatmap/hooks/queries/useFetchSeatMaps.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {SeatMapDetailsArraySchema} from "@/pages/seatmap/schema/model/SeatMap.schema.ts";
import {ReactNode} from "react";
import {SeatMapDetails} from "@/pages/seatmap/schema/model/SeatMap.types.ts";

type LoaderProps = Omit<SeatMapQueryOptions, "showing"> & {
    /**
     * Render prop invoked with validated seat map details.
     */
    children: (data: SeatMapDetails[]) => ReactNode;

    /**
     * Showing ID used to scope seat map results.
     */
    showingID: ObjectId;
};

/**
 * Loads populated seat map details for a given showing and validates
 * the response against `SeatMapDetailsArraySchema`.
 *
 * @param props Loader configuration and render function
 */
const SeatMapDetailsLoader = (
    {children, showingID, ...queryOptions}: LoaderProps
) => {
    const query = useFetchSeatMaps({
        queryConfig: {populate: true, virtuals: true},
        queries: {...queryOptions, showing: showingID},
    });

    return (
        <ValidatedDataLoader query={query} schema={SeatMapDetailsArraySchema}>
            {children}
        </ValidatedDataLoader>
    );
};

export default SeatMapDetailsLoader;
