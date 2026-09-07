import {ReactElement, useState} from 'react';
import {cn} from "@/common/_feat";
import {ChevronDown, ChevronUp} from "lucide-react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/views/common/_comp/ui";
import {URLString} from "@/common/_schemas";
import {Image} from "@/views/common/_comp";

type TextblockProps = {
    url: URLString;
    className?: string;
}

export function MovieBannerImageCollapsible(
    {url, className}: TextblockProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Collapsible
            className="border-l-4 pl-4 space-y-4"
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <CollapsibleTrigger className={cn("primary-text flex justify-between items-center w-full")}>
                <span>Banner Image</span>
                {isOpen ? <ChevronUp/> : <ChevronDown/>}
            </CollapsibleTrigger>

            <CollapsibleContent className={cn(
                "text-justify text-neutral-500 dark:text-gray-500 text-sm",
                className
            )}>
                <Image src={url} />
            </CollapsibleContent>
        </Collapsible>
    );
}
