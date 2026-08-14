/**
 * @fileoverview Side-panel component that hosts the role type submission form within a sheet.
 */

import {Dispatch, ReactElement, ReactNode, SetStateAction, useState} from 'react';
import {Sheet} from "@/views/common/_comp/ui/sheet/Sheet.tsx";
import {ScrollArea} from "@/views/common/_comp/ui/scroll-area.tsx";
import {RoleType} from "@/domains/roletypes/_schema";
import {ScrollAreaScrollbar} from "@radix-ui/react-scroll-area";
import {CreatedRoleTypeList} from "@/views/admin/role-types/_comp";
import {SheetContent} from "@/views/common/_comp/ui/sheet/SheetContent.tsx";
import {SheetHeader} from "@/views/common/_comp/ui/sheet/SheetHeader.tsx";
import {SheetTitle} from "@/views/common/_comp/ui/sheet/SheetTitle.tsx";
import {SheetDescription} from "@/views/common/_comp/ui/sheet/SheetDescription.tsx";
import {SheetTrigger} from "@/views/common/_comp/ui/sheet/SheetTrigger.tsx";
import {cn} from "@/common/_feat";
import {RoleTypeSubmitFormActions, RoleTypeSubmitFormView} from "@/views/admin/role-types";
import {UIOpenStateProps} from "@/common/_types";

type CreatedRoleTypeConfig = {
    createdTypes: RoleType[];
    setCreatedTypes: Dispatch<SetStateAction<RoleType[]>>;
};

/** Props for the RoleTypeSubmitFormPanel component. */
type FormPanelProps = UIOpenStateProps & {
    children: ReactNode;
    className?: string;
    isEditing?: boolean;
    onSubmitConfig: CreatedRoleTypeConfig;
}

/**
 * Renders a sliding sheet containing the RoleTypeSubmitForm and a history of created items.
 */
export function RoleTypeSubmitFormPanel(
    {children, className, isEditing, onSubmitConfig: {createdTypes, setCreatedTypes}}: FormPanelProps
): ReactElement {
    const [open, setOpen] = useState<boolean>(false);

    const action = isEditing ? "Update" : "Create";
    const buttonText = isEditing ? "Edit" : "Create";

    const sheetTitle = `${action} Role Types`;
    const sheetDescription = `${action} role types by submitting data.`;

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>

            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow px-2">
                    <div className={cn("space-y-5", className)}>
                        <div className="space-y-3">
                            <RoleTypeSubmitFormView/>
                            <RoleTypeSubmitFormActions submitButtonText={buttonText}/>
                        </div>

                        {createdTypes.length > 0 && (
                            <CreatedRoleTypeList roleTypes={createdTypes} setRoleTypes={setCreatedTypes}/>
                        )}
                    </div>

                    <ScrollAreaScrollbar orientation="vertical"/>
                </ScrollArea>

            </SheetContent>
        </Sheet>
    );
}
