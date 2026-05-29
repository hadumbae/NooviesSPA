/**
 * @fileoverview Data loader component for the current user's reservations.
 */
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {ReactElement, ReactNode} from "react";
import {
    PaginatedPopulatedReservations,
    PaginatedPopulatedReservationSchema
} from "@/domains/reservation/schema/model/ReservationPaginatedSchemas.ts";
import {useFetchReservationsForCurrentUser} from "@/domains/reservation/_feat/fetch-client-reservations/fetch";

/**
 * Props for the CurrentUserReservationLoader component. */
type LoaderProps = {
    children: (data: PaginatedPopulatedReservations) => ReactNode;
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
        <ValidatedDataLoader query={query} schema={PaginatedPopulatedReservationSchema}>
            {children}
        </ValidatedDataLoader>
    );
}