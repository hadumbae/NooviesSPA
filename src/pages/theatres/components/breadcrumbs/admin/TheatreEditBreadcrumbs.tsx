import {FC} from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/common/components/ui/breadcrumb.tsx";
import {Link} from "react-router-dom";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import LoggedLink from "@/common/components/navigation/LoggedLink.tsx";

/**
 * Props for {@link TheatreDetailsBreadcrumbs}.
 */
export type TheatreDetailsBreadcrumbsProps = {
    /**
     * The unique identifier of the theatre.
     */
    theatreID: ObjectId;

    /**
     * Optional theatre name to display in the breadcrumb.
     * Falls back to `"Theatre"` if not provided.
     */
    theatreName?: string;
};

/**
 * `TheatreDetailsBreadcrumbs` renders a breadcrumb navigation trail
 * for the theatre details editing page within the admin panel.
 *
 * The breadcrumb structure is:
 *
 * **Admin / Theatres → Theatre Details → Edit Details**
 *
 * - The first item links back to the **Theatres Index** page (`/admin/theatres`).
 * - The second item links to the current theatre’s details page.
 * - The final item represents the active **Edit Details** page.
 *
 * @component
 * @example
 * ```tsx
 * <TheatreDetailsBreadcrumbs
 *   theatreID="673a5d49f2a3bc44b12e7e91"
 *   theatreName="Regal Grand"
 * />
 * ```
 *
 * @remarks
 * This component is used on the **Edit Theatre Details** page.
 * It combines standard `react-router-dom` navigation (`Link`) with
 * `LoggedLink` to ensure navigation remains authenticated.
 */
const TheatreDetailsBreadcrumbs: FC<TheatreDetailsBreadcrumbsProps> = ({theatreID, theatreName}) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {/* Index link */}
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/admin/theatres">Index</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                {/* Theatre details link */}
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedLink
                            to={`/admin/theatres/get/${theatreID}`}
                            component={TheatreDetailsBreadcrumbs.name}
                        >
                            {theatreName ?? "Theatre"} | Details
                        </LoggedLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                {/* Current page */}
                <BreadcrumbItem>
                    <BreadcrumbPage>Edit Details</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default TheatreDetailsBreadcrumbs;
