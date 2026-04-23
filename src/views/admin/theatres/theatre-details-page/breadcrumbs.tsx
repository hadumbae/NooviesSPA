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
} from "@/common/components/ui/breadcrumb.tsx";
import {Link} from "react-router-dom";

/** Props for the TheatreDetailsBreadcrumbs component. */
export type BreadcrumbProps = {
    theatreName?: string;
};

/**
 * Renders a navigational breadcrumb path: Index → [Theatre Name] | Details.
 * Provides a quick link back to the main theatre listing.
 */
export function TheatreDetailsBreadcrumbs(
    {theatreName}: BreadcrumbProps
): ReactElement {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/admin/theatres">Index</Link>
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