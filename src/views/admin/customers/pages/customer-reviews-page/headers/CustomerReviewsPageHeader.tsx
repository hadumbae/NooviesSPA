/**
 * @fileoverview Defines the header component for the Customer Reviews page,
 * including breadcrumbs and titles.
 */

import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {CustomerReviewsPageBreadcrumbs} from "@/views/admin/customers/pages/customer-reviews-page/headers/CustomerReviewsPageBreadcrumbs.tsx";
import {ReactElement} from "react";

type HeaderProps = {
    customerCode: UserUniqueCode;
};

/**
 * Renders the header section of the Customer Reviews page, displaying the
 * navigation breadcrumbs and the page title with the customer's code.
 */
export function CustomerReviewsPageHeader(
    {customerCode}: HeaderProps
): ReactElement {
    return (
        <header className="space-y-2">
            <CustomerReviewsPageBreadcrumbs customerCode={customerCode}/>

            <div>
                <h1 className="page-title text-2xl font-bold tracking-tight">
                    All Customer Reviews
                </h1>
                <h2 className="page-subtitle font-light text-muted-foreground">
                    User • <span className="font-medium">{customerCode}</span>
                </h2>
            </div>
        </header>
    );
}