/**
 * @file Clickable section header component with navigation affordance.
 * @filename SectionHeaderLink.tsx
 */

import {ReactNode} from 'react';
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {ChevronRight} from "lucide-react";
import LoggedLink, {LoggedLinkProps} from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {cn} from "@/common/lib/utils.ts";
import {SectionHeaderLinkCSS} from "@/common/constants/css/LinkCSS.ts";

/**
 * Props for SectionHeaderLink.
 */
type LinkProps = LoggedLinkProps & {
    /** Header content */
    children: ReactNode;
};

/**
 * Renders a section header styled as a navigational link.
 */
const SectionHeaderLink = (
    {children, className, ...routeProps}: LinkProps
) => {
    return (
        <LoggedLink {...routeProps}>
            <SectionHeader className={cn(SectionHeaderLinkCSS, className)}>
                {children} <ChevronRight/>
            </SectionHeader>
        </LoggedLink>
    );
};

export default SectionHeaderLink;