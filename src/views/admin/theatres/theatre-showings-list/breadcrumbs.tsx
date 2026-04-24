/**
 * @fileoverview Breadcrumb navigation for the theatre showing list admin page.
 */

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/common/components/ui/breadcrumb.tsx";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {ReactElement} from "react";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";

/** Props for the TheatreShowingListBreadcrumbs component. */
type BreadcrumbProps = {
    theatreSlug: SlugString;
    theatreName: string;
};

/**
 * Renders breadcrumb navigation for the showing list page.
 */
export function TheatreShowingListBreadcrumbs(
    {theatreSlug, theatreName}: BreadcrumbProps
): ReactElement {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedHoverLink to="/admin/theatres">
                            All Theatres
                        </LoggedHoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedHoverLink to={`/admin/theatres/get/${theatreSlug}`}>
                            {theatreName} | Details
                        </LoggedHoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbPage>List Showings</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}