/**
 * @file TheatreShowingListBreadcrumbs.tsx
 *
 * @summary
 * Breadcrumb navigation for the theatre showing list admin page.
 */

import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/common/components/ui/breadcrumb.tsx";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";

/**
 * Props for {@link TheatreShowingListBreadcrumbs}.
 */
type BreadcrumbProps = {
    /** Theatre identifier used for routing */
    theatreID: ObjectId;

    /** Display name of the theatre */
    theatreName: string;
};

/**
 * Renders breadcrumb navigation for:
 * All Theatres → Theatre Details → List Showings.
 *
 * @param props - Component props
 * @returns Breadcrumb UI for the showing list page
 */
const TheatreShowingListBreadcrumbs = ({ theatreID, theatreName }: BreadcrumbProps) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedHoverLink
                            to="/admin/theatres"
                            component={TheatreShowingListBreadcrumbs.name}
                        >
                            All Theatres
                        </LoggedHoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedHoverLink
                            to={`/admin/theatres/get/${theatreID}`}
                            component={TheatreShowingListBreadcrumbs.name}
                        >
                            {theatreName} | Details
                        </LoggedHoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>List Showings</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default TheatreShowingListBreadcrumbs;
