/**
 * @fileoverview Reusable heading component with standardized typography.
 */

import {ReactElement, ReactNode} from 'react';
import {cn} from "@/common/_feat/handle-ui/cn.ts";

type TitleProps = {
    children?: ReactNode;
    text?: string;
    className?: string;
};

/**
 * Renders a semantic h1 header using the standardized 'page-title' styles.
 */
export function HeaderTitle(
    {children, text, className}: TitleProps
): ReactElement {
    return (
        <h1 className={cn("page-title", className)}>
            {children ?? text}
        </h1>
    );
}

