/**
 * @fileoverview A reusable header component for page layouts containing titles, descriptions, and actions.
 */

import {ReactElement, ReactNode} from "react";
import {cn} from "@/common/lib/utils.ts";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";

/** Props for the PageHeader component. */
export type HeaderProps = {
    title: string;
    description?: string;
    breadcrumbs?: ReactNode;
    actions?: ReactNode;
    className?: string;
};

/** A layout component that displays a page title with optional breadcrumbs, description, and action buttons. */
export function PageHeader(
    {className, title, description, breadcrumbs, actions}: HeaderProps
): ReactElement {
    return (
        <header className={cn("flex justify-between items-center", className)}>
            <div className="flex-1 space-y-2">
                {breadcrumbs}
                <HeaderTitle>{title}</HeaderTitle>
                {description && <HeaderDescription>{description}</HeaderDescription>}
            </div>

            {actions}
        </header>
    );
}