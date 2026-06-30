/**
 * @fileoverview Route-level page component for browsing administrative RoleType records.
 *
 */

import {ReactElement} from 'react';
import {RoleTypeListPageContent} from "@/views/admin/role-types/_pages/list-page/content.tsx";
import {useParsedPaginationValue} from "@/common/_feat/fetch-pagination-search-params";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {generatePaginationSchema} from "@/common/_feat/validation-builders";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {PaginatedItems} from "@/common/types";
import {RoleType, RoleTypeQueryOptionsSchema, RoleTypeSchema, useFetchPaginatedRoleTypes} from "@/domains/roletypes";

/**
 * Standardised pagination limit for the Role Type catalogue.
 */
const ROLE_TYPES_PER_PAGE = 25;

/** Primary entry point for the Role Type List administrative view. */
export function RoleTypeListPage(): ReactElement {
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);
    const {searchParams: queryOptions} = useParsedSearchParams({schema: RoleTypeQueryOptionsSchema});

    const query = useFetchPaginatedRoleTypes({
        page,
        perPage: ROLE_TYPES_PER_PAGE,
        queries: queryOptions,
        schema: generatePaginationSchema(RoleTypeSchema),
    });

    return (
        <QueryDataLoader query={query}>
            {({totalItems, items}: PaginatedItems<RoleType>) => (
                <RoleTypeListPageContent
                    roleTypes={items}
                    totalItems={totalItems}
                    page={page}
                    perPage={ROLE_TYPES_PER_PAGE}
                    setPage={setPage}
                />
            )}
        </QueryDataLoader>
    );
}