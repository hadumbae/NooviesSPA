/**
 * @fileoverview Breadcrumb navigation component for the Theatre Details administrative view.
 */

import {ReactElement} from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/views/common/_comp/ui";
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx";

/** Props for the TheatreDetailsBreadcrumbs component. */
export type BreadcrumbProps = {
    theatreName?: string;
};

/**
 * Renders a navigational breadcrumb path: Index → [Theatre Name] | Details.
 */
export function TheatreDetailsBreadcrumbs(
    {theatreName}: BreadcrumbProps
): ReactElement {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <LoggedLink to="/admin/theatres">Index</LoggedLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbPage>
                        {theatreName ?? "Theatre"} | Details
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}