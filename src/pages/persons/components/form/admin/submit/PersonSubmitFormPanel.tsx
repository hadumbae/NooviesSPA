import {FC, ReactNode, useState} from 'react';
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import {Person, PersonDetails} from "@/pages/persons/schema/person/Person.types.ts";
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

/**
 * Props controlling whether the form is in edit mode or create mode.
 *
 * - `isEditing: true` — Editing an existing person; must provide `person`.
 * - `isEditing?: false` — Creating a new person; `person` must be omitted.
 */
type EditingProps =
    | { isEditing: true; person: Person | PersonDetails }
    | { isEditing?: false; person?: never };

/**
 * Props for the `PersonSubmitFormPanel` component.
 *
 * @remarks
 * This panel wraps a person submission form in a sheet UI for either creating
 * or editing a person's details. It handles form state, validation, and submit callbacks.
 */
type FormPanelProps =
    Omit<FormMutationOnSubmitParams, "onSubmitSuccess" | "onSubmitError"> &
    EditingProps & {
    /**
     * Optional trigger element to open the sheet. Defaults to `"Open"` if not provided.
     */
    children?: ReactNode;

    /**
     * Callback invoked when the form is successfully submitted.
     * @param person - The created or updated `Person` object.
     */
    onSubmitSuccess?: (person: Person) => void;

    /**
     * Callback invoked if the form submission fails.
     * @param error - The error thrown during submission.
     */
    onSubmitError?: (error: unknown) => void;

    /**
     * Optional initial values to prefill in the form fields.
     */
    presetValues?: Partial<PersonFormValues>;

    /**
     * Keys of form fields to disable.
     */
    disableFields?: (keyof PersonFormValues)[];

    /**
     * Optional class names for styling the panel container.
     */
    className?: string;
};

/**
 * A sheet-based panel containing the `PersonSubmitFormContainer` for submitting or editing
 * personal details. Can be toggled open/closed via a trigger element.
 *
 * @param params - {@link FormPanelProps}
 */
const PersonSubmitFormPanel: FC<FormPanelProps> = (params) => {
    const {children, onSubmitSuccess, ...props} = params;
    const {isEditing} = props;

    const [open, setOpen] = useState<boolean>(false);

    const sheetTitle = `${isEditing ? "Update" : "Submit"} Personal Details`;
    const sheetDescription = `${isEditing ? "Update" : "Submit"} personal details by using the form.`;

    const closeOnSubmit = (person: Person) => {
        setOpen(false);
        onSubmitSuccess?.(person);
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
                    <PersonSubmitFormContainer {...props} onSubmitSuccess={closeOnSubmit} />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default PersonSubmitFormPanel;
