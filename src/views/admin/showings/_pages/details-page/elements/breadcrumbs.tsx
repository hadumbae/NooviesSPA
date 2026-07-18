/**
 * @fileoverview Breadcrumb navigation for the showing details administration page.
 */

import {ReactElement} from "react";
import {DateTime} from "luxon";
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui";

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