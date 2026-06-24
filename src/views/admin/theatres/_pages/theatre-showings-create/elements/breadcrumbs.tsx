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
} from "@/common/components/ui/breadcrumb.tsx";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ReactElement} from "react";

/** Props for the TheatreShowingCreateBreadcrumbs component. */
type BreadcrumbProps = {
    theatreID: ObjectId;
    theatreName: string;
};

/**
 * Renders a breadcrumb trail linking back to the theatre list and theatre details views.
 */
export function TheatreShowingCreateBreadcrumbs({theatreID, theatreName}: BreadcrumbProps): ReactElement {
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
                        <LoggedHoverLink to={`/admin/theatres/get/${theatreID}`}>
                            {theatreName} | Details
                        </LoggedHoverLink>
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