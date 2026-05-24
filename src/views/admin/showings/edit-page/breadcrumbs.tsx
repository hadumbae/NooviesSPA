/**
 * @fileoverview Breadcrumb navigation for the showing edit administrative view.
 */

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {ShowingDetails} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {ReactElement} from "react";

/** Props for the ShowingEditBreadcrumbs component. */
type BreadcrumbProps = {
    showing: ShowingDetails;
};

/** Breadcrumb navigation component for editing a showing. */
export function ShowingEditBreadcrumbs({showing}: BreadcrumbProps): ReactElement {
    const {slug, startTime, movie: {title: movieTitle}} = showing;

    const formattedStarTime = startTime.toFormat("LLL dd, yyyy | hh:mm");

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedHoverLink
                            to="/admin/showings"
                            component={ShowingEditBreadcrumbs.name}
                        >
                            All Showings
                        </LoggedHoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedHoverLink
                            to={`/admin/showings/get/${slug}`}
                            component={ShowingEditBreadcrumbs.name}
                        >
                            {movieTitle} • {formattedStarTime}
                        </LoggedHoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbPage>
                        Edit Showing
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
