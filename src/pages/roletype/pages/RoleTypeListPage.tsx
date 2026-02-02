/**
 * @file RoleTypeListPage.tsx
 *
 * Route-level page component for browsing `RoleType` records.
 *
 * This page composes pagination, filtering, data fetching, validation,
 * and presentation into a single, mountable route component.
 */

import {FC} from 'react';
import {PaginatedRoleTypeSchema} from "@/pages/roletype/schema/model/RoleType.schema.ts";
import {PaginatedRoleTypes} from "@/pages/roletype/schema/model/RoleType.types.ts";
import useRoleTypeQueryOptionSearchParams
    from "@/pages/roletype/hooks/params/query-option-search-params/useRoleTypeQueryOptionSearchParams.ts";
import RoleTypeListPageContent from "@/pages/roletype/pages/list-page/RoleTypeListPageContent.tsx";
import {useFetchPaginatedRoleTypes} from "@/pages/roletype/hooks/fetch/useFetchPaginatedRoleTypes.ts";
import useParsedPaginationValue from "@/common/hooks/search-params/useParsedPaginationValue.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";

/**
 * Default number of role types displayed per page.
 */
const ROLE_TYPES_PER_PAGE = 25;

/**
 * **RoleTypeListPage**
 *
 * Top-level page component for displaying a **paginated and filterable**
 * list of role types.
 *
 * ### Responsibilities
 * - Read pagination state from URL search params (`page`)
 * - Read filter and sort options from URL search params
 * - Execute paginated role type queries
 * - Handle loading and error states
 * - Validate API responses against {@link PaginatedRoleTypeSchema}
 * - Delegate rendering to {@link RoleTypeListPageContent}
 *
 * ### Data Flow
 * 1. **Search Params**
 *    - Pagination → {@link useParsedPaginationValue}
 *    - Filters & sorting → {@link useRoleTypeQueryOptionSearchParams}
 *
 * 2. **Fetching**
 *    - {@link useFetchPaginatedRoleTypes} executes the paginated query
 *
 * 3. **Boundaries**
 *    - {@link QueryBoundary} handles loading and error UI
 *    - {@link ValidatedQueryBoundary} enforces response schema correctness
 *
 * 4. **Presentation**
 *    - {@link RoleTypeListPageContent} renders the validated data
 *
 * ### Usage
 * This component is intended to be used **only at the route level**
 * and should not be embedded inside other components.
 *
 * @returns The fully composed Role Type List page
 */
const RoleTypeListPage: FC = () => {
    /**
     * URL Search Params
     */
    const {searchParams: queryOptions} = useRoleTypeQueryOptionSearchParams();
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    /**
     * Data Fetching
     */
    const query = useFetchPaginatedRoleTypes({
        page,
        perPage: ROLE_TYPES_PER_PAGE,
        queries: queryOptions,
    });

    return (
        <ValidatedDataLoader query={query} schema={PaginatedRoleTypeSchema}>
            {
                ({totalItems, items}: PaginatedRoleTypes) => (
                    <RoleTypeListPageContent
                        roleTypes={items}
                        totalItems={totalItems}
                        page={page}
                        perPage={ROLE_TYPES_PER_PAGE}
                        setPage={setPage}
                    />
                )
            }
        </ValidatedDataLoader>
    );
};

export default RoleTypeListPage;
