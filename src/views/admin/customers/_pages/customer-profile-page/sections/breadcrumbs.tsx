/**
 * @fileoverview Breadcrumb navigation for the customer profile administrative page.
 */

import {ReactElement} from "react"
import {UserUniqueCode} from "@/domains/users/_schema/fields/UserUniqueCodeSchema.ts"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/views/common/_comp/ui/breadcrumb.tsx"
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx"

/** Props for the CustomerProfilePageBreadcrumbs component. */
type BreadcrumbsProps = {
    customerName: string;
    customerCode: UserUniqueCode
}

/** Navigation breadcrumbs displaying the path from the customer list to a specific customer profile. */
export function CustomerProfilePageBreadcrumbs(
    {customerName, customerCode}: BreadcrumbsProps
): ReactElement {
    return (
        <nav aria-label="Breadcrumb">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <LoggedLink
                            className="breadcrumb-link"
                            to={`/admin/customers`}
                        >
                            Customers
                        </LoggedLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator/>

                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            {customerName} • {customerCode}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </nav>
    )
}