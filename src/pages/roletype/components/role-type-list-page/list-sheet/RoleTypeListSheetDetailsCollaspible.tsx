/**
 * @file RoleTypeListSheetDetailsCollaspible.tsx
 * @description
 * A collapsible section for displaying read-only details of a {@link RoleType}
 * inside the `RoleTypeListSheet`.
 *
 * This section is expanded by default and provides a simple grid layout showing:
 * - Role Name
 * - Department (converted to title case)
 * - Description
 *
 * Designed for lightweight inspection without any editing controls.
 */

import {FC, useState} from 'react';
import {RoleType} from "@/pages/roletype/schema/model/RoleType.types.ts";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/common/components/ui/collapsible.tsx";
import {ChevronDown, ChevronRight} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";

/**
 * Props for {@link RoleTypeListSheetDetailsCollaspible}.
 *
 * @property roleType - The role type entity whose details are displayed.
 */
type CollaspibleProps = {
    roleType: RoleType;
};

/**
 * `RoleTypeListSheetDetailsCollaspible`
 *
 * A read-only collapsible details panel used inside the role type list sheet.
 * This component:
 *
 * - Opens **by default** so the user sees key information immediately.
 * - Provides a structured grid showing role name, department, and description.
 * - Toggles open/closed using a standard collapsible header.
 *
 * @param props - {@link CollaspibleProps} including the `roleType` to display.
 *
 * @example
 * ```tsx
 * <RoleTypeListSheetDetailsCollaspible roleType={role} />
 * ```
 *
 * @returns A collapsible panel displaying static role information.
 */
const RoleTypeListSheetDetailsCollaspible: FC<CollaspibleProps> = ({roleType}) => {
    /** Tracks whether the details section is expanded. Defaults to open. */
    const [detailsOpen, setDetailsOpen] = useState<boolean>(true);

    const {roleName, department, description} = roleType;
    const displayDepartment = convertToTitleCase(department);

    return (
        <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
            <CollapsibleTrigger className="flex items-center space-x-2 text-white">
                {detailsOpen ? <ChevronDown/> : <ChevronRight/>}
                <h1 className={cn(PrimaryTextBaseCSS, "text-md font-bold")}>
                    Basic Details
                </h1>
            </CollapsibleTrigger>

            <CollapsibleContent className="px-1">
                <div className="py-4 grid grid-cols-3 gap-4 items-center">
                    <span className="text-neutral-400 text-sm font-light uppercase">Role Name</span>
                    <span className={cn(PrimaryTextBaseCSS, "col-span-2")}>{roleName}</span>

                    <span className="text-neutral-400 text-sm font-light uppercase">Department</span>
                    <span className={cn(PrimaryTextBaseCSS, "col-span-2")}>{displayDepartment}</span>

                    <span className="text-neutral-400 text-sm font-light uppercase">Description</span>
                    <span className={cn(PrimaryTextBaseCSS, "col-span-2")}>{description ?? "-"}</span>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
};

export default RoleTypeListSheetDetailsCollaspible;
