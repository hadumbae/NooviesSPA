/**
 * @fileoverview A component that renders a labelled list of badge items.
 */

import {ReactElement, ReactNode} from "react";
import {LabelContent} from "@/views/common/_comp/label-content/LabelContent.tsx";
import {BadgeVariant} from "@/common/_types/shadcn/BadgeVariant.ts";
import {cn} from "@/common/_feat";
import {BadgeEntry, BadgeList} from "@/views/common/_comp/badges/BadgeList.tsx";

/** Props for the BadgeLabelContent component. */
type LabelProps = {
    variant?: BadgeVariant;
    orientation?: "horizontal" | "vertical";
    className?: string;
    label: string;
    items: BadgeEntry[];
    emptyText?: ReactNode;
};

/** Renders a label followed by a collection of badges or a fallback empty state. */
export function BadgeLabelContent(
    {items, variant = "outline", emptyText, className, ...remProps}: LabelProps
): ReactElement {
    return (
        <LabelContent classNames={{content: cn("space-x-2", className)}} {...remProps}>
            {
                items.length > 0
                    ? <BadgeList entries={items} variant={variant}/>
                    : emptyText
                    ?? <span className="secondary-text">None</span>
            }
        </LabelContent>
    );
}
