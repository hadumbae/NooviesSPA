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
import buildString from "@/common/utility/buildString.ts";
import {ShowingDetails} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {ReactElement} from "react";

/** Props for the ShowingEditBreadcrumbs component. */
type BreadcrumbProps = {
    showing: ShowingDetails;
};

/** Breadcrumb navigation component for editing a showing. */
export function ShowingEditBreadcrumbs({showing}: BreadcrumbProps): ReactElement {
    const {slug, startTime, movie: {title: movieTitle}} = showing;

    const detailsLabel = buildString([
        movieTitle,
        startTime.toFormat("(MMM dd, YY hh:mm)"),
    ]);

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
                            {detailsLabel}
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
