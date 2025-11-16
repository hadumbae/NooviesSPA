import {FC} from 'react';
import useFetchRoleTypes from "@/pages/roletype/hooks/fetch/useFetchRoleTypes.ts";
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {PaginatedRoleTypeSchema} from "@/pages/roletype/schema/model/RoleType.schema.ts";
import {PaginatedRoleTypes} from "@/pages/roletype/schema/model/RoleType.types.ts";
import useRoleTypeQueryOptionSearchParams
    from "@/pages/roletype/hooks/params/query-option-search-params/useRoleTypeQueryOptionSearchParams.ts";
import RoleTypeListPageContent from "@/pages/roletype/pages/list-page/RoleTypeListPageContent.tsx";

/**
 * **RoleTypeListPage**
 *
 * The top-level page component for displaying a **paginated, filterable**
 * list of role types.
 *
 * This component is responsible for:
 *
 * - Reading pagination params from the URL (`page`, `perPage`)
 * - Reading filter + sort query options from URL search params
 * - Fetching role type data via `useFetchRoleTypes`
 * - Validating server response shape using `ValidatedQueryBoundary`
 * - Rendering the final content using `RoleTypeListPageContent`
 *
 * ## Data Flow
 * 1. **URL search params**
 *    - Pagination → `usePaginationSearchParams`
 *    - Filter/sort options → `useRoleTypeQueryOptionSearchParams`
 *
 * 2. **Fetching**
 *    `useFetchRoleTypes` receives all search params and performs a paginated query.
 *
 * 3. **Error / Loading Handling**
 *    `QueryBoundary` manages loading and error UI.
 *
 * 4. **Validation**
 *    `ValidatedQueryBoundary` ensures the response matches
 *    {@link PaginatedRoleTypeSchema}.
 *
 * 5. **Presentation**
 *    Once validated, `RoleTypeListPageContent` renders:
 *    - Headers
 *    - Filters
 *    - Grid of role type sheets
 *    - Pagination controls
 *
 * ## When to use this component
 * This component is intended to be mounted as the actual route-level page
 * for viewing role types. It should **not** be used inside other components.
 *
 * @returns {JSX.Element} The fully composed role type list page
 */
const RoleTypeListPage: FC = () => {
    // ⚡ Search Params ⚡

    const {searchParams: queryOptions} = useRoleTypeQueryOptionSearchParams();
    const {page, perPage} = usePaginationSearchParams({page: 1, perPage: 25});

    // ⚡ Query ⚡

    const query = useFetchRoleTypes({
        queries: {paginated: true, page, perPage, ...queryOptions}
    });

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={PaginatedRoleTypeSchema}>
                {
                    ({totalItems, items}: PaginatedRoleTypes) =>
                        <RoleTypeListPageContent
                            roleTypes={items}
                            totalItems={totalItems}
                        />
                }
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default RoleTypeListPage;
