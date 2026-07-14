/**
 * @fileoverview Layout component for rendering labeled content sections within cards.
 */

import {ReactElement, ReactNode} from 'react';
import {cn} from "@/common/lib/utils.ts";

type LabelProps = {
    children: ReactNode;
    orientation?: "horizontal" | "vertical";
    label: string;
    classNames?: {
        label?: string;
        container?: string;
        content?: string;
    };
}

/**
 * Displays a labeled section with configurable orientation and custom styling.
 */
export function LabelContent(
    {children, orientation = "vertical", classNames = {}, label}: LabelProps
): ReactElement {
    return (
        <div className={cn(
            orientation === "horizontal" ? "grid grid-cols-3 gap-2 items-center" : "flex flex-col space-y-3",
            classNames?.container,
        )}>
            {
                label &&
                <div>
                    <span className={cn("uppercase text-[12px] select-none", classNames?.label)}>
                        {label}
                    </span>
                </div>
            }

            <div className={cn(orientation === "horizontal" && "col-span-2", classNames?.content)}>
                {children}
            </div>
        </div>
    );
}
