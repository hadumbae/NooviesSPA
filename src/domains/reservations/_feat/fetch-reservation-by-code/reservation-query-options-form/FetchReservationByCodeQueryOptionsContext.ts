/**
 * @fileoverview Context provider and hook exports for managing search parameters context when fetching reservations by code.
 */

import {createQueryOptionsContext} from "@/common/_feat";
import {
    FetchByCodeSearchParamsSchema
} from "@/domains/reservations/_feat/fetch-reservation-by-code/reservation-query-options-form/FetchByCodeSearchParamsSchema.ts";

const {Provider, useQueryOptionsContext} = createQueryOptionsContext({
    name: "fetch-reservation-by-code-query-options-context",
    schema: FetchByCodeSearchParamsSchema,
});

export {
    /** Context provider component for reservation-by-code query options state. */
        Provider as FetchReservationByCodeQueryOptionsContextProvider,
    /** Hook for consuming the reservation-by-code query options context. */
        useQueryOptionsContext as useFetchReservationByCodeQueryOptionsContext,
}