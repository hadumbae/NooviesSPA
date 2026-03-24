/**
 * @file Route-level page component for browsing administrative RoleType records.
 * @filename RoleTypeListPage.tsx
 */

import {FC} from 'react';
import {PaginatedRoleTypeSchema} from "@/domains/roletype/schema/model/RoleType.schema.ts";
import {PaginatedRoleTypes} from "@/domains/roletype/schema/model/RoleType.types.ts";
import RoleTypeListPageContent from "@/domains/roletype/pages/list-page/RoleTypeListPageContent.tsx";
import {useFetchPaginatedRoleTypes} from "@/domains/roletype/hooks/fetch/useFetchPaginatedRoleTypes.ts";
import useParsedPaginationValue
    from "@/common/features/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {RoleTypeQueryOptionsSchema} from "@/domains/roletype/schema/query-options/RoleTypeQueryOptions.schema.ts";

/**
 * Standardized pagination limit for the Role Type catalog.
 */
const ROLE_TYPES_PER_PAGE = 25;

/**
 * The primary entry point for the Role Type List administrative view.
 * @returns A higher-order component that handles the loading, error, and validated data states for Role Types.
 */
const RoleTypeListPage: FC = () => {
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);
    const {searchParams: queryOptions} = useParsedSearchParams({schema: RoleTypeQueryOptionsSchema});

    const query = useFetchPaginatedRoleTypes({
        page,
        perPage: ROLE_TYPES_PER_PAGE,
        queries: queryOptions,
    });

    return (
        <ValidatedDataLoader query={query} schema={PaginatedRoleTypeSchema}>
            {({totalItems, items}: PaginatedRoleTypes) => (
                <RoleTypeListPageContent
                    roleTypes={items}
                    totalItems={totalItems}
                    page={page}
                    perPage={ROLE_TYPES_PER_PAGE}
                    setPage={setPage}
                />
            )}
        </ValidatedDataLoader>
    );
};

export default RoleTypeListPage;