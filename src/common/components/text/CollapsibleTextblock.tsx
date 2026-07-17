/**
 * @fileoverview Collapsible text block component for displaying expandable content.
 */

import {ReactElement, useState} from 'react';
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {ChevronDown, ChevronUp} from "lucide-react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/common/components/ui";

/** Props for the CollapsibleTextblock component. */
type TextblockProps = {
    text: string;
    openText?: string;
    closeText?: string;
    className?: string;
}

/** A component that displays text within a collapsible container with customizable toggle labels. */
export function CollapsibleTextblock(
    {text, openText = "Show More", closeText = "Show Less", className}: TextblockProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Collapsible
            className="border-l-4 pl-4 space-y-4"
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <CollapsibleTrigger className={cn("primary-text flex justify-between items-center w-full")}>
                <span>{isOpen ? closeText : openText}</span>
                {isOpen ? <ChevronUp/> : <ChevronDown/>}
            </CollapsibleTrigger>

            <CollapsibleContent className={cn(
                "text-justify text-neutral-500 dark:text-gray-500 text-sm",
                className
            )}>
                {text}
            </CollapsibleContent>
        </Collapsible>
    );
}
