import {ReactElement} from "react";
import {UserDetails} from "@/domains/users";
import {PageFlexWrapper, PageHeader, PaginationRangeButtons} from "@/views/common/_comp";
import {CustomerIndexCard} from "@/views/admin/customers/_comp/customer-index";

type ContentProps = {
    customers: UserDetails[];
    pagination: {
        page: number;
        setPage: (page: number) => void,
        perPage: number;
        totalItems: number;
    },
};

export function CustomerIndexPageContent(
    {customers, pagination}: ContentProps
): ReactElement {
    console.log("Customers: ", customers);

    return (
        <PageFlexWrapper>
            <PageHeader
                title="Customers"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customers.map((customer) => (
                    <CustomerIndexCard
                        key={customer._id}
                        customer={customer}
                    />
                ))}
            </div>

            <PaginationRangeButtons
                {...pagination}
            />
        </PageFlexWrapper>
    );
}