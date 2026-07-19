/**
 * @fileoverview Breadcrumb navigation for the theatre screen details administration page.
 */

import {ReactElement} from 'react';
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/views/common/_comp/ui";

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
                        <LoggedLink to="/admin/theatres">
                            Index
                        </LoggedLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedLink to={`/admin/theatres/get/${theatreSlug}`}>
                            {theatreName} | Details
                        </LoggedLink>
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