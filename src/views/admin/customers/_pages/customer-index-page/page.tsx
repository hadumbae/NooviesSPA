/**
 * @fileoverview Admin page component for displaying and managing a paginated list of users.
 */

import {ReactElement} from "react";
import {generatePaginationSchema, useParsedPaginationValue, useTitle} from "@/common/_feat";
import {useFetchPaginatedUsers} from "@/domains/users/_feat";
import {UserDetailsSchema} from "@/domains/users/_schema/user";
import {useCustomerIndexQueryOptionsContext} from "@/domains/customers";
import {QueryDataLoader} from "@/views/common/_feat";
import {CustomerIndexPageContent} from "@/views/admin/customers/_pages/customer-index-page/content.tsx";

const CUSTOMERS_PER_PAGE = 20;

/**
 * Main page component for the customer index view that handles data fetching and pagination state.
 * Requires CustomerIndexQueryOptionsContext.
 */
export function CustomerIndexPage(): ReactElement {
    useTitle("User Index");
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);
    const {values: queries} = useCustomerIndexQueryOptionsContext();

    const query = useFetchPaginatedUsers({
        page,
        perPage: CUSTOMERS_PER_PAGE,
        schema: generatePaginationSchema(UserDetailsSchema),
        config: {populate: true, virtuals: true},
        queries,
    });

    return (
        <QueryDataLoader query={query}>
            {({items, totalItems}) => (
                <CustomerIndexPageContent
                    customers={items}
                    pagination={{
                        page,
                        perPage: CUSTOMERS_PER_PAGE,
                        setPage,
                        totalItems
                    }}
                />
            )}
        </QueryDataLoader>
    );
}