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
import {Link} from "react-router-dom";
import {DateTime} from "luxon";

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
    const formattedStartTime = startTime.toFormat("LLL dd, yyyy");

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/admin/showings">
                            Index
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbPage>
                        Showing | {movieTitle} ({formattedStartTime})
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}