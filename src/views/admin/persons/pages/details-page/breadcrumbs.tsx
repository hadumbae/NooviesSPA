/**
 * @fileoverview Breadcrumb navigation for the Person Details page.
 * Provides a hierarchical path from the Person Index to the specific entity.
 */

import {ReactElement} from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import {Link} from "react-router-dom";

/**
 * Props for the {@link PersonDetailsPageBreadcrumbs} component.
 */
type BreadcrumbProps = {
    name: string;
}

/**
 * Renders the navigation trail for a Person's detailed administrative view.
 */
export function PersonDetailsPageBreadcrumbs(
    {name}: BreadcrumbProps
): ReactElement {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {/* Link back to the primary administrative listing */}
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/admin/persons">All Persons</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                {/* The current contextual location */}
                <BreadcrumbItem>
                    <BreadcrumbPage>Personal Details • {name}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}