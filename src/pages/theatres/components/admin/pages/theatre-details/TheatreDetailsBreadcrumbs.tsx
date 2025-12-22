/**
 * @file TheatreDetailsBreadcrumbs.tsx
 * @description Breadcrumbs for the Theatre Details admin page.
 *
 * Shows:
 * - Link to theatre index
 * - Current theatre name (or fallback)
 */

import { FC } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import { Link } from "react-router-dom";

/** Props for {@link TheatreDetailsBreadcrumbs}. */
export type DetailsBreadcrumbProps = {
    /** Optional theatre name; defaults to `"Theatre"`. */
    theatreName?: string;
};

/**
 * **TheatreDetailsBreadcrumbs**
 * Index → Theatre → Details.
 *
 * @example
 * ```tsx
 * <TheatreDetailsBreadcrumbs theatreName="Grand Regent Theatre" />
 * ```
 */
const TheatreDetailsBreadcrumbs: FC<DetailsBreadcrumbProps> = ({ theatreName }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {/* Index */}
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/admin/theatres">Index</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                {/* Current Page */}
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        {theatreName ?? "Theatre"} | Details
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default TheatreDetailsBreadcrumbs;
