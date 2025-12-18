/**
 * Showing Edit Breadcrumbs
 *
 * Renders breadcrumb navigation for the “Edit Showing” admin view.
 * Includes navigation back to all showings, the selected showing’s
 * details page, and the current edit state.
 */

import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
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

type BreadcrumbProps = {
    /** Fully populated showing used to build breadcrumb labels and links */
    showing: ShowingDetails;
};

/**
 * Breadcrumb navigation component for editing a showing.
 *
 * @param props - Component props
 * @param props.showing - Populated showing details
 */
const ShowingEditBreadcrumbs = ({showing}: BreadcrumbProps) => {
    const {_id, startTime, movie: {title: movieTitle}} = showing;

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
                            to={`/admin/showings/get/${_id}`}
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
};

export default ShowingEditBreadcrumbs;
