/**
 * @fileoverview Collapsible section for displaying read-only details of a RoleType.
 */

import {ReactElement, useState} from 'react';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/common/components/ui/collapsible.tsx";
import {ChevronDown, ChevronRight} from "lucide-react";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import {RoleType} from "@/domains/roletypes";

/** Props for the RoleTypeListSheetDetailsCollapsible component. */
type CollapsibleProps = {
    roleType: RoleType;
};

/** A read-only collapsible details panel used inside the role type list sheet. */
export function RoleTypeDetailsCollapsible(
    {roleType}: CollapsibleProps
): ReactElement {
    const [detailsOpen, setDetailsOpen] = useState<boolean>(true);

    const {roleName, department, description} = roleType;
    const displayDepartment = convertToTitleCase(department);

    return (
        <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
            <CollapsibleTrigger className="flex items-center space-x-2 text-white">
                {detailsOpen ? <ChevronDown/> : <ChevronRight/>}
                <h1 className="primary-text text-md font-bold">
                    Basic Details
                </h1>
            </CollapsibleTrigger>

            <CollapsibleContent className="px-1">
                <div className="py-4 grid grid-cols-3 gap-4 items-center">
                    <span className="text-neutral-400 text-sm font-light uppercase">Role Name</span>
                    <span className="primary-text col-span-2">{roleName}</span>

                    <span className="text-neutral-400 text-sm font-light uppercase">Department</span>
                    <span className="primary-text col-span-2">{displayDepartment}</span>

                    <span className="text-neutral-400 text-sm font-light uppercase">Description</span>
                    <span className="primary-text col-span-2">{description ?? "-"}</span>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}


