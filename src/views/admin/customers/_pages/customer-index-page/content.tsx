/**
 * @fileoverview Main content layout for the customer index page in the admin dashboard.
 */

import {ReactElement} from "react";
import {UserDetails} from "@/domains/users/_schema/user";
import {EmptyArrayContainer, PageFlexWrapper, PageHeader, PaginationRangeButtons} from "@/views/common/_comp";
import {CustomerIndexCard} from "@/views/admin/customers/_comp/customer-index";
import {CustomerIndexQueryOptionFormSection} from "@/views/admin/customers/_feat/query-option-forms";

/** Props for the CustomerIndexPageContent component. */
type ContentProps = {
    customers: UserDetails[];
    pagination: {
        page: number;
        setPage: (page: number) => void,
        perPage: number;
        totalItems: number;
    },
};

/** Renders the customer list with filtering options and pagination controls. */
export function CustomerIndexPageContent(
    {customers, pagination}: ContentProps
): ReactElement {
    return (
        <PageFlexWrapper>
            <PageHeader
                title="Customers"
            />

            <CustomerIndexQueryOptionFormSection/>

            {
                customers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {customers.map((customer) => (
                            <CustomerIndexCard
                                key={customer._id}
                                customer={customer}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyArrayContainer
                        text="No Customers Found"
                        className="flex-1"
                    />
                )
            }

            <PaginationRangeButtons
                {...pagination}
            />
        </PageFlexWrapper>
    );
}