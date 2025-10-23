import {FC, ReactNode, useState} from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/sheet.tsx";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import SeatSubmitFormContainer from "@/pages/seats/components/forms/submit-form/SeatSubmitFormContainer.tsx";
import {SeatFormValues} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {FormOptions} from "@/common/type/form/HookFormProps.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Props defining editing state for the SeatSubmitFormPanel.
 *
 * - If `isEditing` is `true`, a `seat` must be provided.
 * - If `isEditing` is `false` or omitted, no seat should be provided.
 */
type PanelEditingProps =
    | { isEditing: true; seat: Seat }
    | { isEditing?: false; seat?: never };

/**
 * Props for the SeatSubmitFormPanel component.
 *
 * Combines:
 * - Form mutation callbacks (`onSubmitSuccess`, `onSubmitError`, etc.)
 * - Editing state (`isEditing` and `seat`)
 * - Optional form UI options (`disableFields`, `presetValues`)
 *
 * Additional props:
 * - `children`: optional ReactNode to trigger opening the panel.
 * - `className`: optional CSS class name for the root container.
 */
type PanelProps =
    Omit<MutationOnSubmitParams<Seat>, "validationSchema"> &
    PanelEditingProps &
    FormOptions<SeatFormValues> & {
    children?: ReactNode;
    className?: string;
};

/**
 * SeatSubmitFormPanel
 *
 * A slide-over panel (Sheet) component for creating or editing Seat entities.
 *
 * Features:
 * - Opens a Sheet with a form for creating or updating seats.
 * - Adjusts title and description depending on `isEditing`.
 * - Closes automatically on successful submission and calls `onSubmitSuccess`.
 *
 * @param params - Panel props combining mutation callbacks, editing state, and optional UI behavior.
 */
const SeatSubmitFormPanel: FC<PanelProps> = (params) => {
    const [open, setOpen] = useState<boolean>(false);

    const {children, onSubmitSuccess, ...formOptions} = params;
    const {isEditing} = formOptions;

    const action = isEditing ? "Update" : "Create";
    const sheetTitle = `${action} Seat`;
    const sheetDescription = `${action} seats by submitting data.`;

    /**
     * Closes the panel after a successful form submission.
     *
     * @param seat - The newly created or updated seat entity.
     */
    const closeOnSubmit = (seat: Seat) => {
        setOpen(false);
        onSubmitSuccess?.(seat);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>{children ? children : "Open"}</SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow px-1">
                    <SeatSubmitFormContainer
                        {...formOptions}
                        onSubmitSuccess={closeOnSubmit}
                    />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default SeatSubmitFormPanel;
