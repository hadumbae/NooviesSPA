import {FC, ReactNode, useEffect, useState} from 'react';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/common/components/ui/collapsible.tsx";
import {ChevronDown, ChevronRight} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";

type TextProps = {
    children: ReactNode;
    defaultOpen?: boolean;
    triggerText?: string;
    className?:string;
}

const TextCollapsible: FC<TextProps> = (props) => {
    const {children, defaultOpen = false, triggerText, className} = props;
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

    useEffect(() => {
        setIsOpen(defaultOpen ?? false);
    }, [defaultOpen])

    const triggerIcon = isOpen ? <ChevronDown/> : <ChevronRight/>;
    const triggerDisplay = `${isOpen ? "Close " : "Open "} ${triggerText}`;

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="flex items-center space-x-2">
                {triggerIcon}
                <h1 className="text-md font-bold">{triggerDisplay}</h1>
            </CollapsibleTrigger>
            <CollapsibleContent className={cn(className)}>
                {children}
            </CollapsibleContent>
        </Collapsible>
    );
};

export default TextCollapsible;
