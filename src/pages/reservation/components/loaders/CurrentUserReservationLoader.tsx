/**
 * @file CurrentUserReservationLoader.tsx
 *
 * Data loader component for fetching the current user's
 * reservations with pagination support.
 *
 * Wraps React Query fetching with schema validation.
 */

import {useFetchReservationsForCurrentUser} from "@/pages/reservation/fetch/useFetchReservationsForCurrentUser.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {
    PaginatedReservationDetailsSchema
} from "@/pages/reservation/schema/model/reservation/ReservationRelated.schema.ts";
import {ReactNode} from "react";
import {
    PaginatedReservationDetails
} from "@/pages/reservation/schema/model/reservation/ReservationRelated.types.ts";

type LoaderProps = {
    /** Render-prop receiving validated paginated reservation data */
    children: (data: PaginatedReservationDetails) => ReactNode;

    /** Current pagination page */
    page?: number;

    /** Number of items per page */
    perPage?: number;
};

/**
 * Fetches and validates the current user's reservations.
 *
 * Handles loading, error, and validation states via
 * `ValidatedDataLoader`.
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
            schema={PaginatedReservationDetailsSchema}
        >
            {children}
        </ValidatedDataLoader>
    );
};

export default CurrentUserReservationLoader;
