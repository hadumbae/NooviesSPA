/**
 * @file TheatreShowingCreateBreadcrumbs.tsx
 *
 * @summary
 * Breadcrumb navigation for the theatre showing creation page.
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

/**
 * Props for {@link TheatreShowingCreateBreadcrumbs}.
 */
type BreadcrumbProps = {
    /**
     * Unique identifier of the theatre.
     */
    theatreID: ObjectId;

    /**
     * Display name of the theatre.
     */
    theatreName: string;
};

/**
 * Renders breadcrumb navigation for creating showings under a theatre.
 *
 * @param props - Component props.
 * @returns A breadcrumb trail linking back to theatre list and theatre details.
 */
const TheatreShowingCreateBreadcrumbs = ({theatreID, theatreName}: BreadcrumbProps) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedHoverLink
                            to="/admin/theatres"
                            component={TheatreShowingCreateBreadcrumbs.name}
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
                            component={TheatreShowingCreateBreadcrumbs.name}
                        >
                            {theatreName} | Details
                        </LoggedHoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>
                        Create Showings
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default TheatreShowingCreateBreadcrumbs;
