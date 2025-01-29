import {FC, useState} from 'react';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/common/components/ui/collapsible.tsx";
import {ChevronDown, ChevronUp} from "lucide-react";

interface Props {
    text: string;
}

const CollapsibleTextblock: FC<Props> = ({text}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Collapsible
            className="text-neutral-500 border-l-4 pl-4 space-y-4"
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <CollapsibleTrigger className="flex justify-between items-center w-full">
                <span>Biography</span>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </CollapsibleTrigger>

            <CollapsibleContent
                className="text-justify"
            >
                {text}
            </CollapsibleContent>
        </Collapsible>
    );
};

export default CollapsibleTextblock;
