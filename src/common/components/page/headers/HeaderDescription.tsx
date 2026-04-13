/**
 * @fileoverview Reusable descriptive text component for page or section headers.
 * Provides a standardized styling for secondary context or instructional text
 * located beneath a primary title.
 */

import {ReactNode} from 'react';
import {cn} from "@/common/lib/utils.ts";

type DescriptionProps = {
    children?: ReactNode;
    text?: string;
    className?: string;
};

/**
 * A paragraph component designed to provide secondary context under a HeaderTitle.
 */
function HeaderDescription({children, text, className}: DescriptionProps) {
    return (
        <p className={cn("page-description", className)}>
            {children ?? text}
        </p>
    );
}

export default HeaderDescription;