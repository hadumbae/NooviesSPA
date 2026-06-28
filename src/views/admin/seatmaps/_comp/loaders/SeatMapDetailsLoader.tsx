/**
 * @fileoverview Data loader for fetching and validating populated seat map details for a specific showing.
 */

import {ReactElement, ReactNode} from "react";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {SeatMapDetails, SeatMapDetailsSchema, SeatMapQueryOptions, useFetchSeatMaps} from "@/domains/seatmap";

/** Props for the SeatMapDetailsLoader component. */
type LoaderProps = {
    children: (data: SeatMapDetails[]) => ReactNode;
    queries?: SeatMapQueryOptions;
};

/** Loads populated seat map details for a given showing and validates the response. */
export function SeatMapDetailsLoader(
    {children, queries}: LoaderProps
): ReactElement {
    const query = useFetchSeatMaps({
        queries,
        config: {populate: true, virtuals: true},
        schema: generateArraySchema(SeatMapDetailsSchema),
    });

    return (
        <QueryDataLoader query={query}>
            {children}
        </QueryDataLoader>
    );
}
