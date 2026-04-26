/**
 * @fileoverview Breadcrumb navigation for the theatre screen details administration page.
 */

import {ReactElement} from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import {Link} from "react-router-dom";

/** Props for the TheatreScreenDetailsBreadcrumbs component. */
type BreadcrumbsProps = {
    theatreSlug: string;
    theatreName: string;
    screenName: string;
}

/**
 * Renders a navigation trail from the theatre index to the specific screen.
 */
export function TheatreScreenDetailsBreadcrumbs(
    {theatreSlug, theatreName, screenName}: BreadcrumbsProps
): ReactElement {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/admin/theatres">
                            Index
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to={`/admin/theatres/get/${theatreSlug}`}>
                            {theatreName} | Details
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbPage>
                        {screenName} | Screen
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}