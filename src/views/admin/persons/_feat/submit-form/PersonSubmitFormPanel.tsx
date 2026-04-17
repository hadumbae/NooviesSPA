/**
 * @fileoverview Slide-over panel (Sheet) for Person entity management.
 * Provides a high-level UI wrapper for the Person submission form, handling
 * open/close states, scrollable content, and success callbacks.
 */

import {ReactElement, ReactNode, useState} from 'react';
import {Person} from "@/domains/persons/schema/person/Person.types.ts";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import PersonSubmitFormContainer from "@/views/admin/persons/_feat/submit-form/PersonSubmitFormContainer.tsx";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/Sheet";
import {PersonFormValues} from "@/domains/persons/_feat/submit-form/PersonFormSchema.ts";

/**
 * Props for the {@link PersonSubmitFormPanel} component.
 */
type FormPanelProps = FormContainerProps<Person, Person, PersonFormValues> & PresetOpenState & {
    children?: ReactNode;
    className?: string;
};

/**
 * A slide-over interface for creating or editing Person records.
 */
export function PersonSubmitFormPanel(
    {children, onSubmitSuccess, presetOpen, setPresetOpen, ...props}: FormPanelProps
): ReactElement {
    const {isEditing} = props;

    const [open, setOpen] = useState<boolean>(false);

    const isControlled = presetOpen !== undefined && setPresetOpen !== undefined;
    const activeOpen = isControlled ? presetOpen : open;
    const setActiveOpen = isControlled ? setPresetOpen : setOpen;

    const sheetTitle = `${isEditing ? "Update" : "Submit"} Personal Details`;
    const sheetDescription = `${isEditing ? "Update" : "Submit"} personal details by using the form below.`;

    const closeOnSubmit = (person: Person) => {
        setActiveOpen(false);
        onSubmitSuccess?.(person);
    }

    return (
        <Sheet open={activeOpen} onOpenChange={setActiveOpen}>
            <SheetTrigger asChild>{children}</SheetTrigger>

            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow px-1 mt-4">
                    <PersonSubmitFormContainer
                        {...props}
                        onSubmitSuccess={closeOnSubmit}
                    />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}

export default PersonSubmitFormPanel;