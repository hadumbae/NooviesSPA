import {FC, ReactNode, useState} from 'react';
import {RoleType} from "@/pages/roletype/schema/model/RoleType.types.ts";
import {RoleTypeFormValues} from "@/pages/roletype/schema/submit-form/RoleTypeForm.types.ts";
import {
    Sheet
} from "@/common/components/ui/Sheet/Sheet.tsx";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import RoleTypeSubmitFormContainer from "@/pages/roletype/components/forms/RoleTypeSubmitFormContainer.tsx";
import {RoleTypeSchema} from "@/pages/roletype/schema/model/RoleType.schema.ts";
import {ScrollAreaScrollbar} from "@radix-ui/react-scroll-area";
import RoleTypeFormCreatedList from "@/pages/roletype/components/forms/form-panel/RoleTypeFormCreatedList.tsx";
import {X} from "lucide-react";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";
import {SheetContent} from "@/common/components/ui/Sheet/SheetContent.tsx";
import {SheetHeader} from "@/common/components/ui/Sheet/SheetHeader.tsx";
import {SheetTitle} from "@/common/components/ui/Sheet/SheetTitle.tsx";
import {SheetDescription} from "@/common/components/ui/Sheet/SheetDescription.tsx";
import {SheetTrigger} from "@/common/components/ui/Sheet/SheetTrigger.tsx";

/**
 * Props for {@link RoleTypeSubmitFormPanel}.
 *
 * Extends {@link FormContainerProps} with UI-related options.
 *
 * @property children - Optional trigger element for opening the panel. Defaults to a link-styled button if not provided.
 * @property className - Optional CSS class for styling the panel.
 * @property closeOnSubmit - If `true` (default), the panel closes after successful form submission.
 */
type FormPanelProps = FormContainerProps<RoleType, RoleType, RoleTypeFormValues> & {
    children?: ReactNode;
    className?: string;
    closeOnSubmit?: boolean;
}

/**
 * A side-panel component for creating or editing {@link RoleType} entities.
 *
 * Renders a sheet with a {@link RoleTypeSubmitFormContainer} inside, manages submission state,
 * and optionally displays a list of created role types.
 *
 * @remarks
 * - Uses Radix UI's `Sheet` for the sliding panel.
 * - Can operate in both create and edit modes via `FormContainerProps`.
 * - Maintains local state of recently created role types for quick reference.
 *
 * @example
 * ```tsx
 * <RoleTypeSubmitFormPanel
 *   isEditing={false}
 *   submitHandler={handleSubmit}
 *   mutation={mutation}
 * >
 *   <Button>Create Role Type</Button>
 * </RoleTypeSubmitFormPanel>
 * ```
 */
const RoleTypeSubmitFormPanel: FC<FormPanelProps> = (props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [roleTypes, setRoleTypes] = useState<RoleType[]>([]);

    const {children, onSubmitSuccess, closeOnSubmit = true, ...formProps} = props;
    const {isEditing} = formProps

    const action = isEditing ? "Update" : "Create";
    const sheetTitle = `${action} Role Types`;
    const sheetDescription = `${action} role types by submitting data.`;

    const defaultOpen = (
        <Button variant="link" className="text-neutral-400 hover:text-black">
            Open
        </Button>
    );

    const toggleSheet = (roleType: RoleType) => {
        setOpen(!closeOnSubmit);
        onSubmitSuccess?.(roleType);

        const {success, data: parsedRoleType} = RoleTypeSchema.safeParse(roleType);
        if (success) {
            setRoleTypes((prev) => [...prev, parsedRoleType]);
        }
    }

    const createdRoleTypeSection = (
        <section className="space-y-2">
            <div className="flex justify-between items-center">
                <h1 className="text-md font-bold">Created Role Types</h1>
                <Button
                    className="text-neutral-400 hover:text-black"
                    variant="link"
                    size="sm"
                    onClick={() => setRoleTypes([])}
                >
                    <X/> Clear
                </Button>
            </div>

            <div className="space-y-1">
                <RoleTypeFormCreatedList roleTypes={roleTypes} setRoleTypes={setRoleTypes}/>
            </div>
        </section>
    );

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {children ? children : defaultOpen}
            </SheetTrigger>

            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow px-2">
                    <div className="space-y-5">
                        <RoleTypeSubmitFormContainer {...formProps} onSubmitSuccess={toggleSheet}/>
                        {roleTypes.length > 0 && createdRoleTypeSection}
                    </div>

                    <ScrollAreaScrollbar orientation="vertical"/>
                </ScrollArea>

            </SheetContent>
        </Sheet>
    );
};

export default RoleTypeSubmitFormPanel;
