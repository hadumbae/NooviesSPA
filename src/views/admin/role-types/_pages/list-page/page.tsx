/**
 * @fileoverview Route-level page component for browsing administrative RoleType records.
 */

import {ReactElement} from 'react';
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {QueryDataLoader} from "@/views/common/_feat";
import {RoleType, RoleTypeQueryOptionsSchema, RoleTypeSchema, useFetchRoleTypes} from "@/domains/roletypes";
import {RoleTypeListPageContent} from "@/views/admin/role-types/_pages/list-page/content.tsx";

/** Primary entry point for the Role Type List administrative view. */
export function RoleTypeListPage(): ReactElement {
    const {searchParams: queryOptions} = useParsedSearchParams({schema: RoleTypeQueryOptionsSchema});

    const query = useFetchRoleTypes({
        queries: queryOptions,
        schema: generateArraySchema(RoleTypeSchema),
    });

    return (
        <QueryDataLoader query={query}>
            {(data: RoleType[]) => <RoleTypeListPageContent roleTypes={data}/>}
        </QueryDataLoader>
    );
}