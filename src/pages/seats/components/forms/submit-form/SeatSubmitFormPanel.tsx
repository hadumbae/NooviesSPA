/**
 * @file SeatSubmitFormPanel.tsx
 * @description
 * A slide-over panel (Sheet) for creating or editing a Seat entity.
 *
 * Wraps `SeatSubmitFormContainer` for form handling, integrates `ScrollArea`
 * for scrollable content, and leverages the `Sheet` component for slide-over
 * panel behavior.
 *
 * The panel supports:
 * - Create or update mode (based on `isEditing`)
 * - Dynamic title and description
 * - Closing on successful submission
 * - Optional custom trigger element (`children`) or default "Open" button
 */

import { FC, ReactNode, useState } from "react";
import { Seat } from "@/pages/seats/schema/seat/Seat.types.ts";
import { ScrollArea } from "@/common/components/ui/scroll-area.tsx";
import SeatSubmitFormContainer from "@/pages/seats/components/forms/submit-form/SeatSubmitFormContainer.tsx";
import { FormContainerProps } from "@/common/type/form/HookFormProps.ts";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/common/components/ui/Sheet";
import { SeatFormValues } from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";
import { SeatDetails } from "@/pages/seats/schema/seat/SeatDetails.types.ts";

/**
 * Props for {@link SeatSubmitFormPanel}.
 *
 * Combines:
 * - Form submission callbacks (`onSubmitSuccess`, `onSubmitError`, etc.)
 * - Editing state (`isEditing` and `seat` for pre-filling form)
 * - Optional UI configuration (`disableFields`, `presetValues`)
 *
 * Additional optional props:
 * - `children`: ReactNode used as the trigger element for opening the panel.
 * - `className`: CSS class name to customize styling of the root container.
 */
type PanelProps = FormContainerProps<SeatDetails, Seat, SeatFormValues> & {
    children?: ReactNode;
    className?: string;
};

/**
 * `SeatSubmitFormPanel`
 *
 * A slide-over panel component for creating or editing Seat entities.
 *
 * @param params - Props combining form callbacks, editing state, and optional UI behavior.
 *
 * @example
 * ```tsx
 * <SeatSubmitFormPanel
 *   isEditing={true}
 *   seat={existingSeat}
 *   onSubmitSuccess={(seat) => console.log("Updated seat:", seat)}
 * >
 *   <button>Edit Seat</button>
 * </SeatSubmitFormPanel>
 * ```
 *
 * @remarks
 * Internally uses `SeatSubmitFormContainer` for form logic and validation,
 * `ScrollArea` for scrollable form content, and `Sheet` for the slide-over
 * panel behavior. Closes automatically on successful submission.
 */
const SeatSubmitFormPanel: FC<PanelProps> = (params) => {
    const [open, setOpen] = useState<boolean>(false);

    const { children, onSubmitSuccess, ...formOptions } = params;
    const { isEditing } = formOptions;

    const action = isEditing ? "Update" : "Create";
    const sheetTitle = `${action} Seat`;
    const sheetDescription = `${action} seats by submitting data.`;

    /**
     * Handles successful form submission by closing the panel
     * and invoking the optional `onSubmitSuccess` callback.
     *
     * @param seat - The newly created or updated seat entity.
     */
    const closeOnSubmit = (seat: SeatDetails) => {
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
