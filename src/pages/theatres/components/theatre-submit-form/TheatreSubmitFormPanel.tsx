import { FC, ReactNode, useState } from 'react';
import { Theatre } from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import { TheatreFormValues } from "@/pages/theatres/schema/forms/TheatreForm.types.ts";
import TheatreSubmitFormContainer from "@/pages/theatres/components/theatre-submit-form/TheatreSubmitFormContainer.tsx";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/sheet.tsx";
import { ScrollArea } from "@/common/components/ui/scroll-area.tsx";
import { FormContainerProps } from "@/common/type/form/HookFormProps.ts";

/**
 * Props for {@link TheatreSubmitFormPanel}.
 *
 * @property children - Optional trigger element for opening the sheet (button, icon, etc.).
 * @property className - Optional CSS classes applied to the container.
 * @property onSubmitSuccess - Callback invoked after a successful theatre submission.
 * @property isEditing - Flag indicating whether the panel is for editing an existing theatre.
 * @property entity - Optional theatre entity for prefilling the form when editing.
 * @property presetValues - Optional partial values to prefill the form fields.
 * @property disableFields - Optional array of form fields to disable (`"name"`, `"location"`, `"seatCapacity"`).
 * @property successMessage - Optional custom success message for the submission.
 * @property errorMessage - Optional custom error message for the submission.
 */
type FormPanelProps = FormContainerProps<Theatre, Theatre, TheatreFormValues> & {
    children?: ReactNode;
    className?: string;
};

/**
 * **TheatreSubmitFormPanel**
 *
 * A slide-over panel (sheet) containing the {@link TheatreSubmitFormContainer} to
 * create or update a theatre.
 *
 * Features:
 * - Opens via a trigger element (`children`) or defaults to "Open".
 * - Shows a sheet title and description that changes depending on `isEditing`.
 * - Wraps the form in a scrollable area for long content.
 * - Automatically closes the sheet after successful submission and invokes `onSubmitSuccess`.
 *
 * @param params - Props controlling form behavior, edit mode, submission callbacks, and UI.
 *
 * @example
 * ```tsx
 * <TheatreSubmitFormPanel
 *   isEditing={true}
 *   entity={existingTheatre}
 *   disableFields={["seatCapacity"]}
 * >
 *   <Button>Edit Theatre</Button>
 * </TheatreSubmitFormPanel>
 * ```
 */
const TheatreSubmitFormPanel: FC<FormPanelProps> = (params) => {
    const [open, setOpen] = useState<boolean>(false);
    const { children, onSubmitSuccess, ...formParams } = params;
    const { isEditing } = formParams;

    const sheetTitle = `${isEditing ? "Update" : "Create"} Theatre`;
    const sheetDescription = `${isEditing ? "Update" : "Create"} theatres by submitting data.`;

    const closeOnSuccess = (theatre: Theatre) => {
        setOpen(false);
        onSubmitSuccess?.(theatre);
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
                    <TheatreSubmitFormContainer
                        {...formParams}
                        onSubmitSuccess={closeOnSuccess}
                    />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default TheatreSubmitFormPanel;
