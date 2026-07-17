/**
 * @fileoverview Side sheet for viewing, editing, and deleting a RoleType entity.
 */

import {ReactElement, useState} from 'react';
import {Sheet} from "@/common/components/ui/sheet/Sheet.tsx";
import {convertToTitleCase} from "@/common/_feat/formatters/convertToTitleCase.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import {ScrollAreaScrollbar} from "@radix-ui/react-scroll-area";
import {Separator} from "@/common/components/ui/separator.tsx";
import {SheetContent} from "@/common/components/ui/sheet/SheetContent.tsx";
import {SheetHeader} from "@/common/components/ui/sheet/SheetHeader.tsx";
import {SheetTitle} from "@/common/components/ui/sheet/SheetTitle.tsx";
import {SheetDescription} from "@/common/components/ui/sheet/SheetDescription.tsx";
import {SheetTrigger} from "@/common/components/ui/sheet/SheetTrigger.tsx";
import {
    RoleTypeDeleteCollapsible
} from "@/views/admin/role-types/_feat/manage-role-type-sheet/RoleTypeDeleteCollapsible.tsx";
import {
    RoleTypeEditCollapsible
} from "@/views/admin/role-types/_feat/manage-role-type-sheet/RoleTypeEditCollapsible.tsx";
import {
    RoleTypeDetailsCollapsible
} from "@/views/admin/role-types/_feat/manage-role-type-sheet/RoleTypeDetailsCollapsible.tsx";
import {RoleType} from "@/domains/roletypes/_schema/model/RoleTypeSchema.ts";

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
                        <RoleTypeDetailsCollapsible
                            roleType={roleType}
                        />

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

                    <ScrollAreaScrollbar orientation="vertical"/>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
