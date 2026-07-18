/**
 * @fileoverview Slide-over panel (Sheet) component for creating or editing seat entities.
 */

import {ReactElement} from "react";
import {RotateCcw} from "lucide-react";
import {
    Button,
    ScrollArea,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui";
import {useFormContext} from "react-hook-form";
import useRequiredContext from "@/common/_feat/use-context/useRequiredContext.ts";
import {BaseFormContext} from "@/common/_feat/generic-form-context";
import {UIOpenStateProps} from "@/common/_types";
import {FormViewProps} from "@/common/_feat/submit-data/formTypes.ts";
import {cn} from "@/common/_feat";
import {SeatFormValues, useBuildSeatFormRenderFields} from "@/domains/seats";

/** Props for the SeatSubmitFormPanel component. */
type PanelProps = UIOpenStateProps & FormViewProps<SeatFormValues> & {
    isEditing?: boolean;
};

/**
 * A side-sheet component that orchestrates the seat submission form.
 */
export function SeatSubmitFormPanel(
    {children, isOpen, setIsOpen, disableFields, isEditing, className}: PanelProps
): ReactElement {

    const {reset} = useFormContext();
    const {formID, isPending} = useRequiredContext({context: BaseFormContext});

    const renderedFields = useBuildSeatFormRenderFields({disableFields});

    const action = isEditing ? "Update" : "Create";
    const sheetTitle = `${action} Seat`;
    const sheetDescription = `${action} seats by submitting data.`;

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                {children ? children : <Button variant="outline">Open</Button>}
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-1 px-1">
                    <div className={cn("space-y-4 pt-4", className)}>
                        {renderedFields}

                        <div className="flex items-center space-x-2 pt-4">
                            <Button
                                form={formID}
                                variant="primary"
                                type="submit"
                                className="flex-1"
                                disabled={isPending}
                            >
                                {isPending ? "Submitting..." : "Submit"}
                            </Button>

                            <Button
                                variant="secondary"
                                type="button"
                                disabled={isPending}
                                onClick={() => reset()}
                            >
                                <RotateCcw className="h-4 w-4"/>
                            </Button>
                        </div>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}