/**
 * @fileoverview A badge component that displays a label alongside a colored status icon based on a boolean flag.
 */

import {ReactElement} from 'react';
import {Badge} from "@/common/components/ui/badge.tsx";
import {BadgeCheckIcon} from "lucide-react";
import {cn} from "@/common/_feat";

/** Props for the BooleanFlagLabelSpan component. */
type FlagProps = {
    label: string,
    flag: boolean
}

/**
 * Renders a labelled badge with a green checkmark or red icon depending on the flag state.
 */
export function BooleanFlagLabelSpan(
    {label, flag}: FlagProps
): ReactElement {
    return (
        <Badge variant="outline" className={cn(
            "flex justify-between items-center px-2 py-1",
            flag ? "border-green-500 dark:border-green-500" : "border-red-500 dark:border-red-500"
        )}>
            <span className="select-none">{label}</span>
            <BadgeCheckIcon className={flag ? "text-green-500" : "text-red-500"}/>
        </Badge>
    );
}
