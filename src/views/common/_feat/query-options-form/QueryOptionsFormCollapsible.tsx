/**
 * @fileoverview A collapsible container for query option forms that displays active filter counts.
 */

import {ReactElement, ReactNode} from "react";
import {Button, Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/views/common/_comp/ui";
import {ChevronsUpDown, X} from "lucide-react";
import {UIOpenStateProps} from "@/common/_types";
import {useQueryOptionFormContext} from "@/common/_feat";

/** Props for the QueryOptionsFormCollapsible component. */
type CollapsibleProps = UIOpenStateProps & {
    children: ReactNode;
};

/**
 * A collapsible wrapper that provides a toggle trigger and a clear button for query filters.
 * Requires QueryOptionFormContext to manage active option counts and reset functionality.
 */
export function QueryOptionsFormCollapsible(
    {children, isOpen, setIsOpen}: CollapsibleProps
): ReactElement {
    const {activeOptions, resetValues} = useQueryOptionFormContext();

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
            <CollapsibleTrigger asChild>
                <Button variant="ghost" className="secondary-text">
                    <ChevronsUpDown/>
                    <span>{activeOptions > 0 ? `Toggle Filters • ${activeOptions}` : "Toggle Filters"}</span>
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="border p-3 rounded-md w-fit space-y-5">
                {children}

                {
                    activeOptions > 0 && (
                        <div>
                            <Button variant="secondary" onClick={resetValues}>
                                <X/> Clear
                            </Button>
                        </div>
                    )
                }
            </CollapsibleContent>
        </Collapsible>
    );
}