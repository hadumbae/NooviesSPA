import {FC, ReactNode, useState} from 'react';
import {Person} from "@/pages/persons/schema/person/Person.types.ts";
import {PersonFormValues} from "@/pages/persons/schema/forms/PersonForm.types.ts";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/sheet.tsx";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import PersonSubmitFormContainer from "@/pages/persons/components/form/admin/submit/PersonSubmitFormContainer.tsx";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";

/**
 * Props for `PersonSubmitFormPanel`.
 *
 * @property children - Optional element that triggers the slide-over panel.
 * @property className - Optional CSS class applied to the form container.
 * @property presetOpen - Optional controlled open state for the panel.
 * @property setPresetOpen - Optional setter for controlled open state.
 * @property onSubmitSuccess - Optional callback executed when the form is successfully submitted.
 * @property props - Other props required for `PersonSubmitFormContainer`, including `isEditing`, `entity`, and `presetValues`.
 */
type FormPanelProps = FormContainerProps<Person, Person, PersonFormValues> & PresetOpenState & {
    children?: ReactNode;
    className?: string;
};

/**
 * Slide-over panel for creating or updating a person's details.
 *
 * @remarks
 * - Uses `Sheet` to provide a slide-over UI panel with header and description.
 * - Wraps `PersonSubmitFormContainer` inside a scrollable area.
 * - Supports controlled or uncontrolled open state using `presetOpen` / `setPresetOpen`.
 * - Automatically closes the panel upon successful form submission and calls `onSubmitSuccess`.
 * - Adjusts header title and description based on whether the form is in edit mode.
 *
 * @example
 * ```tsx
 * <PersonSubmitFormPanel
 *   isEditing={false}
 *   presetValues={{name: "John Doe"}}
 *   onSubmitSuccess={(person) => console.log("Submitted", person)}
 * >
 *   <Button>Open Form</Button>
 * </PersonSubmitFormPanel>
 * ```
 */
const PersonSubmitFormPanel: FC<FormPanelProps> = (params) => {
    const {children, onSubmitSuccess, presetOpen, setPresetOpen, ...props} = params;
    const {isEditing} = props;

    const [open, setOpen] = useState<boolean>(false);

    const sheetTitle = `${isEditing ? "Update" : "Submit"} Personal Details`;
    const sheetDescription = `${isEditing ? "Update" : "Submit"} personal details by using the form.`;

    /**
     * Closes the panel and triggers the external success callback.
     *
     * @param person - The person entity returned from a successful form submission.
     */
    const closeOnSubmit = (person: Person) => {
        setOpen(false);
        onSubmitSuccess?.(person);
    }

    return (
        <Sheet open={presetOpen ?? open} onOpenChange={setPresetOpen ?? setOpen}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow px-1">
                    <PersonSubmitFormContainer
                        {...props}
                        onSubmitSuccess={closeOnSubmit}
                    />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default PersonSubmitFormPanel;
