/**
 * @fileoverview Admin page component for listing and paginating through users.
 */

import {ReactElement} from "react";
import {generatePaginationSchema, useParsedPaginationValue} from "@/common/_feat";
import {useFetchPaginatedUsers, UserSchema} from "@/domains/users";
import {useUserIndexQueryOptionsContext} from "@/domains/users/_ctx";
import {QueryDataLoader} from "@/views/common/_feat";
import {UserIndexPageContent} from "@/views/admin/users/pages/index-page/content.tsx";

const USERS_PER_PAGE = 20;

/**
 * Main entry point for the user management index view.
 * Requires UserIndexQueryOptionsContext to provide active search and filter parameters.
 */
export function UserIndexPage(): ReactElement {
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const {values: queries} = useUserIndexQueryOptionsContext();

    const query = useFetchPaginatedUsers({
        page,
        perPage: USERS_PER_PAGE,
        schema: generatePaginationSchema(UserSchema),
        queries,
    });

    return (
        <QueryDataLoader query={query}>
            {({items, totalItems}) => (
                <UserIndexPageContent
                    page={page}
                    setPage={setPage}
                    perPage={USERS_PER_PAGE}
                    totalUsers={totalItems}
                    users={items}
                />
            )}
        </QueryDataLoader>
    );
}