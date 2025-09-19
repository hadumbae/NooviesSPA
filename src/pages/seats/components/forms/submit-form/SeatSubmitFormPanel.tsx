import {FC, ReactNode, useState} from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/sheet.tsx";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import SeatSubmitFormContainer from "@/pages/seats/components/forms/submit-form/SeatSubmitFormContainer.tsx";
import {SeatFormValues} from "@/pages/seats/schema/form/SeatForm.types.ts";

type PanelEditingProps =
    | { isEditing: true, seat: Seat }
    | { isEditing?: false; seat?: never };

type PanelProps = Omit<FormMutationOnSubmitParams, "onSubmitSuccess"> & PanelEditingProps &
    {
        children?: ReactNode;
        className?: string;
        presetValues?: Partial<SeatFormValues>;
        disableFields?: (keyof SeatFormValues)[];
        onSubmitSuccess?: (seat: Seat) => void
    };

const SeatSubmitFormPanel: FC<PanelProps> = (params) => {
    const [open, setOpen] = useState<boolean>(false);

    const {children, onSubmitSuccess, ...formOptions} = params;
    const {isEditing} = formOptions;

    const sheetTitle = `${isEditing ? "Update" : "Create"} Seat`;
    const sheetDescription = `${isEditing ? "Update" : "Create"} seats by submitting data.`;

    const closeOnSubmit = (seat: Seat) => {
        setOpen(false);
        onSubmitSuccess && onSubmitSuccess(seat);
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>{children ? children : "Open"}</SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow px-1">
                    <SeatSubmitFormContainer{...formOptions} onSubmitSuccess={closeOnSubmit}/>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default SeatSubmitFormPanel;
