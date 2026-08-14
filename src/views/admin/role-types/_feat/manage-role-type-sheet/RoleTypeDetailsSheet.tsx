/**
 * @fileoverview Side sheet for viewing, editing, and deleting a RoleType entity.
 */

import {ReactElement, useState} from 'react';
import {RoleType} from "@/domains/roletypes";
import {convertToTitleCase} from "@/common/_feat/formatters/convertToTitleCase.ts";
import {
    RoleTypeDeleteCollapsible
} from "@/views/admin/role-types/_feat/manage-role-type-sheet/RoleTypeDeleteCollapsible.tsx";
import {
    RoleTypeEditCollapsible
} from "@/views/admin/role-types/_feat/manage-role-type-sheet/RoleTypeEditCollapsible.tsx";
import {
    RoleTypeDetailsCollapsible
} from "@/views/admin/role-types/_feat/manage-role-type-sheet/RoleTypeDetailsCollapsible.tsx";
import {
    Card,
    CardContent,
    ScrollArea,
    ScrollBar,
    Separator,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/views/common/_comp/ui";

/** Props for the RoleTypeListSheet component. */
type SheetProps = {
    roleType: RoleType;
};

/**
 * Renders a card that opens a side panel containing role details and management actions.
 */
export function RoleTypeDetailsSheet(
    {roleType}: SheetProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {_id, roleName, department} = roleType;
    const displayDepartment = convertToTitleCase(department);

    const onDeleteSuccess = () => {
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
                        <RoleTypeDetailsCollapsible roleType={roleType}/>

                        <Separator/>

                        <RoleTypeEditCollapsible
                            roleType={roleType}
                            onSubmitConfig={{successMessage: "Edited."}}
                        />

                        <Separator/>

                        <RoleTypeDeleteCollapsible
                            _id={_id}
                            onSubmitConfig={{
                                onSubmitSuccess: onDeleteSuccess,
                                successMessage: "Deleted.",
                            }}
                        />
                    </section>

                    <ScrollBar orientation="vertical"/>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
