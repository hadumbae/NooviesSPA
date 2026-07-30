/**
 * @fileoverview React Query hook for retrieving paginated movie reservations for a specific customer.
 */
import {FetchQueryOptions} from "@/common/_types/fetch-queries/FetchQueryOptions.ts";
import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import {
    getFetchCustomerReservationsViewData
} from "@/domains/customers/_feat/manage-reservations/repository/repository.ts";
import {CustomerReservationsViewQueryKeys} from "@/domains/customers/_feat/manage-reservations/fetch/queryKeys.ts";
import {ObjectId} from "@/common/_schemas";
import {
    CustomerReservationsViewData,
    CustomerReservationsViewDataSchema
} from "@/domains/customers/_feat/manage-reservations/schema/viewDataSchema.ts";

/** Parameters for the useFetchCustomerReservationsViewData hook. */
export type FetchParams = {
    customerID: ObjectId;
    pagination: PaginationValues;
    options?: FetchQueryOptions<CustomerReservationsViewData>;
};

/** Manages the server-state and validation for a customer's paginated review history. */
export function useFetchCustomerReservationsViewData(
    {customerID, pagination, options}: FetchParams
): UseQueryResult<CustomerReservationsViewData, HttpResponseError> {
    const fetchDetails = buildQueryFn({
        schema: CustomerReservationsViewDataSchema,
        action: () => getFetchCustomerReservationsViewData({customerID, pagination})
    });

    return useQuery({
        queryKey: CustomerReservationsViewQueryKeys.reservations({customerID, ...pagination}),
        queryFn: fetchDetails,
        ...useQueryOptionDefaults(options),
    });
}