import { FC, PropsWithChildren, useState } from 'react';
import SeatsByRowSubmitFormContainer
    from "@/pages/seats/components/features/seats-by-row/row-seats-submit-form/SeatsByRowSubmitFormContainer.tsx";
import { SeatsByRowFormValues } from "@/pages/seats/schema/form/SeatForm.types.ts";
import { FormOptions } from "@/common/type/form/HookFormProps.ts";
import { Seat } from "@/pages/seats/schema/seat/Seat.types.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/Sheet";

/**
 * Props for SeatsByRowSubmitFormPanel.
 *
 * Combines:
 * - Form mutation callbacks (`onSubmitSuccess`, `onSubmitError`, etc.)
 * - Optional UI behavior: `presetValues` to prefill the form, `disableFields` to disable inputs.
 * - Optional CSS className for styling.
 */
type PanelProps =
    MutationOnSubmitParams<Seat[]> &
    FormOptions<SeatsByRowFormValues> & {
    /** Optional CSS class for the root container */
    className?: string;
};

/**
 * SeatsByRowSubmitFormPanel
 *
 * A slide-over panel (Sheet) component for creating multiple seats by row.
 *
 * Features:
 * - Opens a Sheet with a form for creating multiple seats.
 * - Closes automatically on successful submission.
 * - Passes mutation callbacks, preset values, and UI options to the internal form container.
 *
 * @param params - Panel props combining mutation callbacks, UI options, and optional children.
 */
const SeatsByRowSubmitFormPanel: FC<PropsWithChildren<PanelProps>> = (params) => {
    const { children, presetValues, disableFields, className, onSubmitSuccess, ...options } = params;
    const [open, setOpen] = useState<boolean>(false);

    /**
     * Closes the panel and triggers the `onSubmitSuccess` callback after successful submission.
     *
     * @param seats - The array of newly created Seat entities
     */
    const closeOnSuccess = (seats: Seat[]) => {
        setOpen(false);
        onSubmitSuccess?.(seats);
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>{children ? children : "Open"}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add Seats By Row</SheetTitle>
                    <SheetDescription>Create seats by row.</SheetDescription>
                </SheetHeader>

                <SeatsByRowSubmitFormContainer
                    presetValues={presetValues}
                    disableFields={disableFields}
                    className={className}
                    onSubmitSuccess={closeOnSuccess}
                    {...options}
                />
            </SheetContent>
        </Sheet>
    );
};

export default SeatsByRowSubmitFormPanel;
