/**
 * @fileoverview Hook for retrieving and validating pagination data from the router location state.
 */

import {useLocation} from "react-router-dom";
import {
    PaginationValues,
    PaginationValuesSchema
} from "@/common/_feat/fetch-pagination-search-params/schemas/PaginationValuesSchema.ts";

/** Result of the pagination state validation. */
type PaginationReturns =
    | { success: true; data: PaginationValues }
    | { success?: false; data: null };

/** Extracts and validates pagination values from the current navigation state. */
export function usePaginationLocationState(): PaginationReturns {
    const {state} = useLocation();
    const {data, success} = PaginationValuesSchema.safeParse(state);

    return success
        ? {success: true, data}
        : {success: false, data: null};
}