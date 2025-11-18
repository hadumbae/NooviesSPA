import {useLocation} from "react-router-dom";
import {
    PaginationValues,
    PaginationValuesSchema
} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";

/**
 * Represents the outcome of parsing pagination values from `location.state`.
 *
 * Returned by {@link usePaginationLocationState}.
 *
 * ## Variants
 * - **Success**:
 *   ```ts
 *   { success: true; data: PaginationValues }
 *   ```
 *   Indicates that the `state` object contained valid pagination values.
 *
 * - **Failure**:
 *   ```ts
 *   { success?: false; data: null }
 *   ```
 *   Indicates that `state` was missing, invalid, or failed schema validation.
 */
export type PaginationReturns =
    | { success: true; data: PaginationValues }
    | { success?: false; data: null };

/**
 * Attempts to extract and validate pagination values from React Router's
 * `location.state`.
 *
 * ## Purpose
 * This hook is designed to support navigation flows where pagination must be
 * preserved between pages. For example:
 *
 * - Returning to a list page from a detail page
 * - Preserving pagination after routing interactions
 *
 * It validates the state using {@link PaginationValuesSchema} to ensure strong
 * typing and prevent invalid values from leaking into the pagination logic.
 *
 * ## Behavior
 * 1. Reads the `state` object from `useLocation()`.
 * 2. Attempts to validate it using `PaginationValuesSchema.safeParse`.
 * 3. Returns one of two shapes:
 *    - **Valid state:** `{ success: true, data: PaginationValues }`
 *    - **Invalid / missing state:** `{ success: false, data: null }`
 *
 * ## Example
 * ### Passing State
 * ```tsx
 * navigate("/genres", {
 *   state: { page: 3, perPage: 50 }
 * });
 * ```
 *
 * ### Receiving State
 * ```tsx
 * const paginationState = usePaginationLocationState();
 *
 * if (paginationState.success) {
 *   console.log(paginationState.data.page);     // 3
 *   console.log(paginationState.data.perPage);  // 50
 * }
 * ```
 *
 * ## Use Cases
 * - Restoring list state after navigating to a detail view.
 * - Passing validated pagination context between pages.
 * - Ensuring consistent pagination control in URL + navigation hybrid flows.
 *
 * @returns A discriminated union describing whether the parsed state is valid.
 */
export default function usePaginationLocationState(): PaginationReturns {
    const {state} = useLocation();
    const {data, success} = PaginationValuesSchema.safeParse(state);

    return success
        ? {success: true, data}
        : {success: false, data: null};
}