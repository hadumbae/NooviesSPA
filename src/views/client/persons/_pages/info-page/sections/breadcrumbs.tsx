/**
 * @fileoverview Renders breadcrumb navigation for the person info page.
 */

import {ReactElement} from 'react';
import {Link} from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/views/common/_comp/ui";

/** Props for the PersonInfoPageBreadcrumbs component. */
type BreadcrumbProps = {
    name: string;
}

/**
 * Renders a breadcrumb hierarchy linking back to the browse persons list with the specified person's name as the current page.
 */
export function PersonInfoPageBreadcrumbs(
    {name}: BreadcrumbProps
): ReactElement {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/browse/persons">Browse Persons</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbPage>{name}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}