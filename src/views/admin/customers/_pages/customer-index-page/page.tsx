import {ReactElement} from "react";
import {generatePaginationSchema, useParsedPaginationValue, useTitle} from "@/common/_feat";
import {useFetchPaginatedUsers, UserDetailsSchema} from "@/domains/users";
import {useCustomerIndexQueryOptionsContext} from "@/domains/customers";
import {QueryDataLoader} from "@/views/common/_feat";
import {CustomerIndexPageContent} from "@/views/admin/customers/_pages/customer-index-page/content.tsx";

const CUSTOMERS_PER_PAGE = 20;

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