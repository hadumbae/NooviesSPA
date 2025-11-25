import {FC, useState} from 'react';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/common/components/ui/collapsible.tsx";
import {ChevronDown, ChevronUp} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {PrimaryTextBaseCSS, QuoteTextCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * Props for the `CollapsibleTextblock` component.
 */
type TextblockProps = {
    /**
     * The main text content to display inside the collapsible section.
     */
    text: string;

    /**
     * Text for the trigger button when the collapsible is closed.
     * @default "Show More"
     */
    openText?: string;

    /**
     * Text for the trigger button when the collapsible is open.
     * @default "Show Less"
     */
    closeText?: string;

    className?: string;
}

/**
 * A text block component that can be expanded or collapsed by the user.
 *
 * @remarks
 * Uses the `Collapsible` component to show/hide the text content.
 * Displays a toggle button with customizable open/close labels and an icon indicating the state.
 *
 * @example
 * ```tsx
 * <CollapsibleTextblock
 *   text="Here is some detailed content..."
 *   openText="Read More"
 *   closeText="Read Less"
 * />
 * ```
 */
const CollapsibleTextblock: FC<TextblockProps> = (props) => {
    const {text, openText = "Show More", closeText = "Show Less", className} = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Collapsible
            className="border-l-4 pl-4 space-y-4"
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <CollapsibleTrigger className={cn(PrimaryTextBaseCSS, "flex justify-between items-center w-full")}>
                <span>{isOpen ? closeText : openText}</span>
                {isOpen ? <ChevronUp/> : <ChevronDown/>}
            </CollapsibleTrigger>

            <CollapsibleContent className={cn(
                "text-justify",
                QuoteTextCSS,
                className
            )}>
                {text}
            </CollapsibleContent>
        </Collapsible>
    );
};

export default CollapsibleTextblock;
