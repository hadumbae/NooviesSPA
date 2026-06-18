/**
 * @fileoverview Header component for the Customer Reviews page.
 */

import {UserUniqueCode} from "@/domains/users/schema/fields/UserUniqueCodeSchema.ts";
import {CustomerReviewsPageBreadcrumbs} from "@/views/admin/customers/customer-reviews-page/sections/breadcrumbs.tsx";
import {ReactElement} from "react";

/** Props for the CustomerReviewsPageHeader component. */
type HeaderProps = {
    customerCode: UserUniqueCode;
};

/** Header section for the Customer Reviews page displaying breadcrumbs and the customer identity. */
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