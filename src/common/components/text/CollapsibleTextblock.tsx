import {FC, useState} from 'react';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/common/components/ui/collapsible.tsx";
import {ChevronDown, ChevronUp} from "lucide-react";

/**
 * Props for the `CollapsibleTextblock` component.
 */
interface TextblockProps {
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
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {
        text,
        openText = "Show More",
        closeText = "Show Less",
    } = props;

    return (
        <Collapsible
            className="text-neutral-500 border-l-4 pl-4 space-y-4"
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <CollapsibleTrigger className="flex justify-between items-center w-full">
                <span>{isOpen ? closeText : openText}</span>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </CollapsibleTrigger>

            <CollapsibleContent className="text-justify">
                {text}
            </CollapsibleContent>
        </Collapsible>
    );
};

export default CollapsibleTextblock;
