/**
 * @fileoverview A reusable header component for page layouts containing titles, descriptions, and actions.
 */

import {ReactElement, ReactNode} from "react";
import {cn} from "@/common/_feat";
import {HeaderTitle} from "@/views/common/_comp/page-headers/HeaderTitle.tsx";
import {HeaderDescription} from "@/views/common/_comp/page-headers/HeaderDescription.tsx";
import {HeaderSubtitle} from "@/views/common/_comp";

/** Props for the PageHeader component. */
export type HeaderProps = {
    title: ReactNode;
    subtitle?: ReactNode;
    description?: ReactNode;
    breadcrumbs?: ReactNode;
    actions?: ReactNode;
    className?: string;
};

/** A layout component that displays a page title with optional breadcrumbs, description, and action buttons. */
export function PageHeader(
    {className, title, description, subtitle, breadcrumbs, actions}: HeaderProps
): ReactElement {
    return (
        <header className={cn("flex justify-between items-center", className)}>
            <div className="flex-1 space-y-3">
                {breadcrumbs}

                <div>
                    <HeaderTitle>{title}</HeaderTitle>
                    {subtitle && <HeaderSubtitle>{subtitle}</HeaderSubtitle>}
                    {description && <HeaderDescription>{description}</HeaderDescription>}
                </div>
            </div>

            {actions}
        </header>
    );
}