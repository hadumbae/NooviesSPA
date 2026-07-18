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
import {HoverLink} from "@/views/common/_feat/navigation/HoverLink.tsx";
import {ShowingDetails} from "@/domains/showings/_schema/showing/ShowingDetailsSchema.ts";
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
                        <HoverLink
                            to="/admin/showings"
                            component={ShowingEditBreadcrumbs.name}
                        >
                            All Showings
                        </HoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <HoverLink
                            to={`/admin/showings/get/${slug}`}
                            component={ShowingEditBreadcrumbs.name}
                        >
                            {movieTitle} • {formattedStarTime}
                        </HoverLink>
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
