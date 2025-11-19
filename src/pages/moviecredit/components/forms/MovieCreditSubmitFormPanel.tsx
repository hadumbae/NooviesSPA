import {FC, ReactNode, useState} from 'react';
import {MovieCredit} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/sheet.tsx";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import MovieCreditSubmitFormContainer from "@/pages/moviecredit/components/forms/MovieCreditSubmitFormContainer.tsx";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";
import {MovieCreditFormValues} from "@/pages/moviecredit/schemas/form/MovieCreditForm.types.ts";
import {SubmitPanelCSS} from "@/common/constants/css/SheetCSS.ts";

/**
 * Props for the {@link MovieCreditSubmitFormPanel} component.
 *
 * Extends {@link FormContainerProps} for managing form state, preset values, and submission.
 * Adds an optional `children` prop to customize the trigger element that opens the panel.
 *
 * @template TEntity - The type of the entity being created/edited (here {@link MovieCredit}).
 * @template TData - The type of data returned after form submission.
 * @template TFormValues - The shape of the form values.
 */
type FormPanelProps = FormContainerProps<MovieCredit, MovieCredit, MovieCreditFormValues> & {
    /**
     * Optional custom trigger element to open the form panel.
     * If not provided, defaults to a simple `"Open"` button.
     */
    children?: ReactNode;
};

/**
 * A side-panel component for creating or updating movie credits.
 *
 * This component renders a sheet (side panel) containing the
 * {@link MovieCreditSubmitFormContainer}. The title and description
 * automatically adapt based on whether the form is in create or edit mode.
 *
 * On successful submission:
 * - The sheet closes automatically.
 * - The optional `onSubmitSuccess` callback is invoked with the newly created or updated entity.
 *
 * @example
 * ```tsx
 * <MovieCreditSubmitFormPanel
 *   isEditing={false}
 *   onSubmitSuccess={(credit) => console.log("Created:", credit)}
 * >
 *   <Button>Add Credit</Button>
 * </MovieCreditSubmitFormPanel>
 * ```
 *
 * @param props - The props for configuring the panel, including form state and optional trigger element.
 * @param props.children - Optional custom trigger element to open the sheet.
 * @param props.isEditing - Whether the form is in edit mode.
 * @param props.onSubmitSuccess - Optional callback invoked with the `MovieCredit` entity after submission.
 */
const MovieCreditSubmitFormPanel: FC<FormPanelProps> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {children, onSubmitSuccess, ...formProps} = props;
    const {isEditing} = formProps;

    const action = isEditing ? "Update" : "Create";
    const sheetTitle = `${action} Movie Credits`;
    const sheetDescription = `${action} movie credits by submitting data.`;

    /**
     * Handles successful form submission.
     *
     * - Closes the sheet panel.
     * - Calls the `onSubmitSuccess` callback if provided.
     *
     * @param credit - The submitted `MovieCredit` entity.
     */
    const closeOnSubmit = (credit: MovieCredit) => {
        setIsOpen(false);
        onSubmitSuccess?.(credit);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>{children ?? "Open"}</SheetTrigger>

            <SheetContent className={SubmitPanelCSS}>
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-wrap">
                    <MovieCreditSubmitFormContainer
                        {...formProps}
                        onSubmitSuccess={closeOnSubmit}
                    />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default MovieCreditSubmitFormPanel;
