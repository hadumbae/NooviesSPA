/**
 * @fileoverview A collapsible wrapper for the person search and filter form.
 */

import {ReactElement, ReactNode, useState} from "react";
import {ChevronsUpDown} from "lucide-react";
import {Button, Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/views/common/_comp/ui";
import {useParsedSearchParams} from "@/common/_feat";
import {BrowsePersonsQueryOptionsSchema} from "@/domains/persons";

/** Props for the BrowsePersonsQueryOptionsFormCollapsible component. */
type CollapsibleProps = {
    children: ReactNode;
};

/** A collapsible container that displays a summary of active person search filters. */
export function BrowsePersonsQueryOptionsFormCollapsible(
    {children}: CollapsibleProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {searchParams: {name, sortByName}} = useParsedSearchParams({schema: BrowsePersonsQueryOptionsSchema});

    const filterText = [name && name, sortByName && "Sorted"].filter(Boolean);
    const spanText = filterText.length
        ? "Toggle Filters • " + filterText.join(", ")
        : "Toggle Filters";

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
            <CollapsibleTrigger asChild>
                <Button variant="ghost" className="secondary-text">
                    <ChevronsUpDown/>
                    <span>{spanText}</span>
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="border p-3 rounded-md w-fit">
                {children}
            </CollapsibleContent>
        </Collapsible>
    );
}