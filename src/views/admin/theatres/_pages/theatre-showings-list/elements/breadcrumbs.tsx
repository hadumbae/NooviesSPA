/**
 * @fileoverview Breadcrumb navigation for the theatre showing list admin page.
 */

import {ReactElement} from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/views/common/_comp/ui";
import {HoverLink} from "@/views/common/_feat/navigation/HoverLink.tsx";
import {SlugString} from "@/common/_schemas/strings/slug-strings/SlugString.ts";

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
                        <HoverLink to="/admin/theatres">
                            All Theatres
                        </HoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <HoverLink to={`/admin/theatres/get/${theatreSlug}`}>
                            {theatreName} | Details
                        </HoverLink>
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