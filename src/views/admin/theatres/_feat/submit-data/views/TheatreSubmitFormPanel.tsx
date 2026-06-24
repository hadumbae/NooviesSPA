/**
 * @fileoverview Slide-over panel (Sheet) for creating or updating a Theatre.
 */

import {ReactElement} from 'react';
import {
    Button,
    ScrollArea,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/common/components/ui";
import {UIOpenStateProps} from "@/common/types";
import {FormViewProps} from "@/common/_feat/submit-data/formTypes.ts";
import {TheatreSubmitFormView} from "@/views/admin/theatres/_feat/submit-data/views/TheatreSubmitFormView.tsx";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";

import {TheatreFormValues} from "@/domains/theatres/_feat/submit-data";

/** Props for the TheatreSubmitFormPanel component. */
type FormPanelProps = Omit<FormViewProps<TheatreFormValues>, "isNestedView"> & UIOpenStateProps & {
    isEditing?: boolean;
};

/**
 * Slide-over container that houses the Theatre submission form.
 */
export function TheatreSubmitFormPanel(
    {children, disableFields, className, isEditing, isOpen, setIsOpen}: FormPanelProps
): ReactElement {
    const {formID, isPending} = useBaseFormContext();

    const sheetTitle = `${isEditing ? "Update" : "Create"} Theatre`;
    const sheetDescription = `${isEditing ? "Update" : "Create"} theatres by submitting data.`;

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>{children ? children : "Open"}</SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow px-1">
                    <div className="space-y-4 px-1">
                        <TheatreSubmitFormView disableFields={disableFields} className={className}/>
                        <Button variant="primary" form={formID} type="submit" disabled={isPending} className="w-full">
                            Submit
                        </Button>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}