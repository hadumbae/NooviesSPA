/**
 * @fileoverview Data loader component for the current user's reservations.
 */

import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {ReactElement, ReactNode} from "react";
import {useFetchReservationsForCurrentUser} from "@/domains/reservation/_feat/fetch-client-reservations/fetch";
import {PaginatedItems} from "@/common/types";
import {PopulatedReservation, PopulatedReservationSchema} from "@/domains/reservation/schema/model";
import {generatePaginationSchema} from "@/common/_feat/validation-builders";

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
    const query = useFetchReservationsForCurrentUser({
        pagination: {page, perPage},
    });

    return (
        <ValidatedDataLoader query={query} schema={generatePaginationSchema(PopulatedReservationSchema)}>
            {children}
        </ValidatedDataLoader>
    );
}