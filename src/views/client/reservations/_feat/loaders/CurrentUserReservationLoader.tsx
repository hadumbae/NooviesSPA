/**
 * @fileoverview Data loader component for the current user's reservations.
 */

import {ReactElement, ReactNode} from "react";
import {useFetchReservationsForCurrentUser} from "@/domains/reservation/_feat";
import {PaginatedItems} from "@/common/types";
import {PopulatedReservation} from "@/domains/reservation/schema";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";

/**
 * Props for the CurrentUserReservationLoader component. */
type LoaderProps = {
    children: (data: PaginatedItems<PopulatedReservation>) => ReactNode;
    page?: number;
    perPage?: number;
};

/**
 * Orchestrates the fetching and schema validation of user-specific reservations. */
export function CurrentUserReservationLoader(
    {page = 1, perPage = 20, children}: LoaderProps
): ReactElement {
    const query = useFetchReservationsForCurrentUser({pagination: {page, perPage}});

    return (
        <QueryDataLoader query={query}>
            {children}
        </QueryDataLoader>
    );
}