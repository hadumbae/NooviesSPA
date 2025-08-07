import {useLocation} from "react-router-dom";
import {paginationSearchParamSchema} from "@/common/schema/PaginationSearchParamsSchema.ts";

/**
 * Represents pagination-related data extracted from location state.
 *
 * @property page - The current page number.
 * @property perPage - The number of items per page.
 */
type PaginationData = { page: number, perPage: number };

/**
 * Represents the possible return types of the `usePaginationLocationState` hook.
 *
 * - When parsing is successful: `{ success: true, data: PaginationData }`
 * - When parsing fails: `{ success?: false, data: null }`
 */
type PaginationReturns = | { success: true, data: PaginationData } | { success?: false, data: null }

/**
 * A custom React hook that extracts and validates pagination parameters
 * (`page` and `perPage`) from the `state` object provided by `react-router-dom`'s `useLocation`.
 *
 * It uses a Zod schema (`paginationSearchParamSchema`) to validate the shape and type of the data.
 *
 * @returns An object that indicates whether the parsing was successful:
 * - If successful: `{ success: true, data: { page, perPage } }`
 * - If not: `{ success: false, data: null }`
 *
 * @example
 * ```tsx
 * const { success, data } = usePaginationLocationState();
 * if (success) {
 *   console.log(data.page, data.perPage);
 * } else {
 *   // Fallback or error handling
 * }
 * ```
 */
export default function usePaginationLocationState(): PaginationReturns {
    const {state} = useLocation();
    const {data, success} = paginationSearchParamSchema.safeParse(state);

    if (success) {
        return {success: true, data};
    }

    return {success, data: null};
}