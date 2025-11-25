import { FC } from "react";
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
 * `TheatreCreateBreadcrumbs` renders a breadcrumb navigation trail
 * for the theatre creation page in the admin panel.
 *
 * The breadcrumb structure is:
 *
 * **Admin / Theatres → Create**
 *
 * - The first item links back to the **Theatres Index** page (`/admin/theatres`).
 * - The second item displays the current page, **Create**, as non-clickable text.
 *
 * @component
 * @example
 * ```tsx
 * <TheatreCreateBreadcrumbs />
 * ```
 *
 * @remarks
 * This component is typically used at the top of the **Create Theatre** page.
 * It uses `LoggedLink` to ensure navigation respects authentication state.
 */
const TheatreCreateBreadcrumbs: FC = () => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedHoverLink
                            to="/admin/theatres"
                            component={TheatreCreateBreadcrumbs.name}
                        >
                            Index
                        </LoggedHoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>Create</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default TheatreCreateBreadcrumbs;
