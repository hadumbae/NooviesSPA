/**
 * @fileoverview Breadcrumb navigation for the theatre showing creation page.
 */

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/views/common/_comp/ui/breadcrumb.tsx";
import {HoverLink} from "@/views/common/_feat/navigation/HoverLink.tsx";
import {SlugString} from "@/common/_schemas";
import {ReactElement} from "react";

/** Props for the TheatreShowingCreateBreadcrumbs component. */
type BreadcrumbProps = {
    theatreSlug: SlugString;
    theatreName: string;
};

/**
 * Renders a breadcrumb trail linking back to the theatre list and theatre details views.
 */
export function TheatreShowingCreateBreadcrumbs({theatreSlug, theatreName}: BreadcrumbProps): ReactElement {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <HoverLink to="/admin/theatres">
                            Theatres
                        </HoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <HoverLink to={`/admin/theatres/get/${theatreSlug}`}>
                            {theatreName}
                        </HoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbPage>
                        Create Showings
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}