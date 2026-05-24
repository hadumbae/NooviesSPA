/**
 * @fileoverview Breadcrumb navigation for the showing details administration page.
 */

import {ReactElement} from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import {DateTime} from "luxon";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";

/** Props for the ShowingDetailsPageBreadcrumbs component. */
type BreadcrumbProps = {
    movieTitle: string;
    startTime: DateTime;
};

/**
 * Renders a breadcrumb trail leading from the showings index to the specific movie showing.
 */
export function ShowingDetailsPageBreadcrumbs(
    {movieTitle, startTime}: BreadcrumbProps
): ReactElement {
    const formattedStartTime = startTime.toFormat("LLL dd, yyyy | hh:mm");

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedLink to="/admin/showings">
                            All Showings
                        </LoggedLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbPage>
                        {movieTitle} • {formattedStartTime}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}