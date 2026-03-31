/**
 * @file Data loader component for the current user's reservations.
 * @filename CurrentUserReservationLoader.tsx
 */

import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {ReactNode} from "react";
import {
    PaginatedPopulatedReservations,
    PaginatedPopulatedReservationSchema
} from "@/domains/reservation/schema/model/ReservationPaginatedSchemas.ts";
import {useFetchReservationsForCurrentUser} from "@/domains/reservation/features/client-reservations/fetch";

/**
 * Props for {@link CurrentUserReservationLoader}.
 */
type LoaderProps = {
    /** * Render-prop pattern: receives the validated {@link PaginatedPopulatedReservations}.
     */
    children: (data: PaginatedPopulatedReservations) => ReactNode;

    /** Current subset of data to fetch. Defaults to 1. */
    page?: number;

    /** Number of records to return in the page. Defaults to 20. */
    perPage?: number;
};

/**
 * Orchestrates the fetching and schema validation of user-specific reservations.
 * * @description
 * This component abstracts the data-fetching lifecycle:
 * 1. Executes {@link useFetchReservationsForCurrentUser} with the provided pagination.
 * 2. Passes the resulting query and {@link PaginatedPopulatedReservationSchema} to {@link ValidatedDataLoader}.
 * 3. Handles loading and error UI internally before calling the `children` function with typed data.
 * * @param props - {@link LoaderProps} including pagination and render-prop.
 */
const CurrentUserReservationLoader = (
    {page = 1, perPage = 20, children}: LoaderProps
) => {
    const query = useFetchReservationsForCurrentUser({
        pagination: {page, perPage},
    });

    return (
        <ValidatedDataLoader
            query={query}
            schema={PaginatedPopulatedReservationSchema}
        >
            {children}
        </ValidatedDataLoader>
    );
};

export default CurrentUserReservationLoader;