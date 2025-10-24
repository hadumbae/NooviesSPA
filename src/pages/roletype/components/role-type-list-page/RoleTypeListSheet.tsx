import {FC, useState} from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/sheet.tsx";
import {RoleType} from "@/pages/roletype/schema/model/RoleType.types.ts";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import {ScrollAreaScrollbar} from "@radix-ui/react-scroll-area";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/common/components/ui/collapsible.tsx";
import {ChevronDown, ChevronRight, TriangleAlert} from "lucide-react";
import {Separator} from "@/common/components/ui/separator.tsx";
import RoleTypeSubmitFormContainer from "@/pages/roletype/components/forms/RoleTypeSubmitFormContainer.tsx";
import useRoleTypeDeleteMutation from "@/pages/roletype/hooks/mutations/useRoleTypeDeleteMutation.ts";
import {Button} from "@/common/components/ui/button.tsx";

/**
 * Props for the {@link RoleTypeListSheet} component.
 */
type SheetProps = {
    /** The role type entity to display inside the sheet. */
    roleType: RoleType;
}

/**
 * `RoleTypeListSheet` renders a card that, when clicked, opens a side sheet
 * displaying details, editing, and deletion options for a given {@link RoleType}.
 *
 * Features:
 * - **Details** section: shows basic info like role name, department, description.
 * - **Edit** section: contains a form for editing the role type.
 * - **Delete** section: confirms and triggers role type deletion.
 *
 * @param props - {@link SheetProps} containing the `roleType` entity to display.
 *
 * @example
 * ```tsx
 * <RoleTypeListSheet roleType={roleType} />
 * ```
 */
const RoleTypeListSheet: FC<SheetProps> = ({roleType}) => {
    /** Controls whether the main sheet is open. */
    const [isOpen, setIsOpen] = useState<boolean>(false);

    /** Controls whether the "Basic Details" section is expanded. */
    const [detailsOpen, setDetailsOpen] = useState<boolean>(true);

    /** Controls whether the "Edit Role Type" section is expanded. */
    const [editOpen, setEditOpen] = useState<boolean>(false);

    /** Controls whether the "Delete Role Type" section is expanded. */
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

    const {_id, roleName, department, description} = roleType;
    const displayDepartment = convertToTitleCase(department);

    /**
     * Callback invoked after a successful edit.
     * Closes both the sheet and the edit collapsible.
     */
    const onEditSuccess = () => {
        setIsOpen(false);
        setEditOpen(false);
    }

    /**
     * Callback invoked after a successful deletion.
     * Closes both the sheet and the delete collapsible.
     */
    const onDeleteSuccess = () => {
        setIsOpen(false);
        setDeleteOpen(false);
    }

    /** Mutation hook for deleting a role type. */
    const {isPending, mutate} = useRoleTypeDeleteMutation({onDeleteSuccess});

    /** Collapsible section that displays role type details. */
    const detailsCollaspible = (
        <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
            <CollapsibleTrigger className="flex items-center space-x-2">
                {detailsOpen ? <ChevronDown/> : <ChevronRight/>}
                <h1 className="text-md font-bold">Basic Details</h1>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-1">
                <div className="py-4 grid grid-cols-3 gap-4 items-center">
                    <span className="text-neutral-400 text-sm font-light uppercase">Role Name</span>
                    <span className="col-span-2">{roleName}</span>

                    <span className="text-neutral-400 text-sm font-light uppercase">Department</span>
                    <span className="col-span-2">{displayDepartment}</span>

                    <span className="text-neutral-400 text-sm font-light uppercase">Description</span>
                    <span className="col-span-2">{description ?? "-"}</span>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );

    /** Collapsible section that contains the edit form. */
    const editCollaspible = (
        <Collapsible open={editOpen} onOpenChange={setEditOpen}>
            <CollapsibleTrigger className="flex items-center space-x-2">
                {editOpen ? <ChevronDown/> : <ChevronRight/>}
                <h1 className="text-md font-bold">Edit Role Type</h1>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-1">
                <RoleTypeSubmitFormContainer
                    className="py-4"
                    onSubmitSuccess={onEditSuccess}
                    isEditing={true}
                    entity={roleType}
                />
            </CollapsibleContent>
        </Collapsible>
    );

    /** Collapsible section that prompts for deletion confirmation. */
    const deleteCollaspible = (
        <Collapsible open={deleteOpen} onOpenChange={setDeleteOpen}>
            <CollapsibleTrigger className="flex items-center space-x-2">
                {deleteOpen ? <ChevronDown/> : <ChevronRight/>}
                <h1 className="text-md font-bold">Delete Role Type</h1>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-1">
                <section className="py-4 flex flex-col justify-between items-center space-y-3">
                    <TriangleAlert size={50} className="text-red-500"/>

                    <p className="text-justify">
                        Do you want to delete the role type? This will remove all related data and cannot be reversed.
                        Proceed?
                    </p>

                    <Button
                        variant="default"
                        className="w-full bg-primary"
                        onClick={() => mutate({_id})}
                        disabled={isPending}
                    >
                        Delete
                    </Button>
                </section>
            </CollapsibleContent>
        </Collapsible>
    );

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
                        {detailsCollaspible}
                        <Separator/>
                        {editCollaspible}
                        <Separator/>
                        {deleteCollaspible}
                    </section>

                    <ScrollAreaScrollbar orientation="vertical"/>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default RoleTypeListSheet;