/**
 * @fileoverview Side-panel component that hosts the role type submission form within a sheet.
 */

import {ReactElement, ReactNode, useState} from 'react';
import {Sheet} from "@/views/common/_comp/ui/sheet/Sheet.tsx";
import {ScrollArea} from "@/views/common/_comp/ui/scroll-area.tsx";
import {Button} from "@/views/common/_comp/ui/button.tsx";
import {RoleTypeSubmitForm} from "@/views/admin/role-types/_feat/submit-form/RoleTypeSubmitForm.tsx";
import {RoleType} from "@/domains/roletypes/_schema";
import {ScrollAreaScrollbar} from "@radix-ui/react-scroll-area";
import {CreatedRoleTypeList} from "@/views/admin/role-types/_comp";
import {SheetContent} from "@/views/common/_comp/ui/sheet/SheetContent.tsx";
import {SheetHeader} from "@/views/common/_comp/ui/sheet/SheetHeader.tsx";
import {SheetTitle} from "@/views/common/_comp/ui/sheet/SheetTitle.tsx";
import {SheetDescription} from "@/views/common/_comp/ui/sheet/SheetDescription.tsx";
import {SheetTrigger} from "@/views/common/_comp/ui/sheet/SheetTrigger.tsx";
import {FormContainerConfigProps} from "@/common/_feat/submit-data";
import {cn} from "@/common/_feat";
import {RoleTypeFormData, RoleTypeFormValues} from "@/domains/roletypes/_feat";
import {RoleTypeSubmitFormActions, RoleTypeSubmitFormView} from "@/views/admin/role-types";

/** Props for the RoleTypeSubmitFormPanel component. */
type FormPanelProps = FormContainerConfigProps<RoleTypeFormValues, RoleType, RoleTypeFormData, RoleType> & {
    children?: ReactNode;
    className?: string;
    isEditing?: boolean;
}

/**
 * Renders a sliding sheet containing the RoleTypeSubmitForm and a history of created items.
 */
export function RoleTypeSubmitFormPanel(
    {children, className, isEditing, onSubmitConfig, formConfig, resetConfig}: FormPanelProps
): ReactElement {
    const [open, setOpen] = useState<boolean>(false);
    const [roleTypes, setRoleTypes] = useState<RoleType[]>([]);

    const action = isEditing ? "Update" : "Create";
    const buttonText = isEditing ? "Edit" : "Create";

    const sheetTitle = `${action} Role Types`;
    const sheetDescription = `${action} role types by submitting data.`;

    const toggleSheet = (roleType: RoleType) => {
        setOpen(false);
        onSubmitConfig?.onSubmitSuccess?.(roleType);

        setRoleTypes((prev) => [...prev, roleType]);
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {children ?? (
                    <Button variant="link" className="text-neutral-400 hover:text-black">
                        Open
                    </Button>
                )}
            </SheetTrigger>

            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow px-2">
                    <div className={cn("space-y-5", className)}>
                        <RoleTypeSubmitForm
                            onSubmitConfig={{onSubmitSuccess: toggleSheet, ...onSubmitConfig}}
                            formConfig={formConfig}
                            resetConfig={resetConfig}
                        >
                            <div className="space-y-3">
                                <RoleTypeSubmitFormView/>
                                <RoleTypeSubmitFormActions submitButtonText={buttonText}/>
                            </div>
                        </RoleTypeSubmitForm>

                        {roleTypes.length > 0 && (
                            <CreatedRoleTypeList
                                roleTypes={roleTypes}
                                setRoleTypes={setRoleTypes}
                            />
                        )}
                    </div>

                    <ScrollAreaScrollbar orientation="vertical"/>
                </ScrollArea>

            </SheetContent>
        </Sheet>
    );
}
