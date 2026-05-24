/**
 * @fileoverview Slide-over panel (Sheet) for creating or updating a Theatre.
 */

import {ReactElement} from 'react';
import {Sheet} from "@/common/components/ui/Sheet/Sheet.tsx";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import {SheetContent} from "@/common/components/ui/Sheet/SheetContent.tsx";
import {SheetHeader} from "@/common/components/ui/Sheet/SheetHeader.tsx";
import {SheetTitle} from "@/common/components/ui/Sheet/SheetTitle.tsx";
import {SheetDescription} from "@/common/components/ui/Sheet/SheetDescription.tsx";
import {SheetTrigger} from "@/common/components/ui/Sheet/SheetTrigger.tsx";
import {TheatreFormStarterValues} from "@/domains/theatres/_feat/submit-data";
import {FormViewProps} from "@/common/_feat/submit-data/formTypes.ts";
import {UIOpenStateProps} from "@/common/types";
import {TheatreSubmitFormView} from "@/views/admin/theatres/_feat/submit-data/views/TheatreSubmitFormView.tsx";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {PrimaryButton} from "@/views/common/_comp/submit-form";

/** Props for the TheatreSubmitFormPanel component. */
type FormPanelProps = FormViewProps<TheatreFormStarterValues> & UIOpenStateProps & {
    isEditing?: boolean;
};

/**
 * Slide-over container that houses the Theatre submission form.
 */
export function TheatreSubmitFormPanel(
    params: FormPanelProps
): ReactElement {
    const {children, disableFields, className, isEditing, isOpen, setIsOpen} = params;

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
                        <PrimaryButton form={formID} type="submit" disabled={isPending} className="w-full">
                            Submit
                        </PrimaryButton>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}