/**
 * @file RoleTypeListSheet.tsx
 * @description
 * Renders an interactive side sheet for viewing, editing, and deleting a
 * {@link RoleType}.
 *
 * The component is displayed as a clickable card. When clicked, it opens a Sheet
 * containing three collapsible sections:
 *
 * - **Details** — Shows role name, department, and other metadata.
 * - **Edit** — Contains an inline edit form for the role type.
 * - **Delete** — Provides a confirmation and triggers deletion.
 *
 * This component centralizes all CRUD-related UI for `RoleType` items directly
 * inside a Sheet-based side panel.
 *
 * @example
 * ```tsx
 * function Page() {
 *   return <RoleTypeListSheet roleType={roleType} />;
 * }
 * ```
 */

import {FC, useState} from 'react';
import {Sheet} from "@/common/components/ui/Sheet/Sheet.tsx";
import {RoleType} from "@/pages/roletype/schema/model/RoleType.types.ts";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import {ScrollAreaScrollbar} from "@radix-ui/react-scroll-area";
import {Separator} from "@/common/components/ui/separator.tsx";
import {SheetContent} from "@/common/components/ui/Sheet/SheetContent.tsx";
import {SheetHeader} from "@/common/components/ui/Sheet/SheetHeader.tsx";
import {SheetTitle} from "@/common/components/ui/Sheet/SheetTitle.tsx";
import {SheetDescription} from "@/common/components/ui/Sheet/SheetDescription.tsx";
import {SheetTrigger} from "@/common/components/ui/Sheet/SheetTrigger.tsx";
import RoleTypeListSheetDeleteCollaspible
    from "@/pages/roletype/components/role-type-list-page/list-sheet/RoleTypeListSheetDeleteCollaspible.tsx";
import RoleTypeListSheetEditCollaspible
    from "@/pages/roletype/components/role-type-list-page/list-sheet/RoleTypeListSheetEditCollaspible.tsx";
import RoleTypeListSheetDetailsCollaspible
    from "@/pages/roletype/components/role-type-list-page/list-sheet/RoleTypeListSheetDetailsCollaspible.tsx";

/**
 * Props for the {@link RoleTypeListSheet} component.
 *
 * @property roleType - The role type entity to be displayed and managed inside the sheet.
 */
type SheetProps = {
    roleType: RoleType;
};

/**
 * `RoleTypeListSheet`
 *
 * Renders a clickable card for a given {@link RoleType}. When clicked,
 * a side sheet opens with collapsible sections for:
 *
 * - **Viewing details** of the role type.
 * - **Editing** the role type.
 * - **Deleting** the role type (with confirmation).
 *
 * The sheet automatically closes after a successful deletion.
 *
 * @param props - {@link SheetProps} containing the source `roleType`.
 *
 * @example
 * ```tsx
 * <RoleTypeListSheet roleType={role} />
 * ```
 *
 * @returns A card element that opens a sheet containing details, edit, and delete actions.
 */
const RoleTypeListSheet: FC<SheetProps> = ({roleType}) => {
    /** Controls whether the main sheet is visible. */
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {_id, roleName, department} = roleType;
    const displayDepartment = convertToTitleCase(department);

    /**
     * Callback fired when a destructive action (delete) succeeds.
     * Closes the sheet.
     */
    const onSuccess = () => {
        setIsOpen(false);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Card className="cursor-pointer">
                    <CardContent className="p-4 space-y-2 flex flex-col items-center justify-center">
                        <h1 className="text-md font-bold">{roleName}</h1>
                        <span className="text-[12px] text-neutral-400">{department}</span>
                    </CardContent>
                </Card>
            </SheetTrigger>

            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{roleName}</SheetTitle>
                    <SheetDescription>{displayDepartment}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow">
                    <section className="space-y-5">
                        {/* Details Section */}
                        <RoleTypeListSheetDetailsCollaspible roleType={roleType} />

                        <Separator/>

                        {/* Edit Section */}
                        <RoleTypeListSheetEditCollaspible roleType={roleType} />

                        <Separator/>

                        {/* Delete Section */}
                        <RoleTypeListSheetDeleteCollaspible
                            _id={_id}
                            onDeleteSuccess={onSuccess}
                        />
                    </section>

                    <ScrollAreaScrollbar orientation="vertical"/>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default RoleTypeListSheet;
