/**
 * @file MovieCreditSubmitFormPanel.tsx
 *
 * Side-panel wrapper for creating or editing movie credits.
 * Renders a sheet containing {@link MovieCreditSubmitFormContainer}
 * and manages open/close state automatically.
 */

import {ReactNode, useState} from 'react';
import {MovieCredit, MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import MovieCreditSubmitFormContainer from "@/pages/moviecredit/components/forms/MovieCreditSubmitFormContainer.tsx";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";
import {MovieCreditFormValues} from "@/pages/moviecredit/schemas/form/MovieCreditForm.types.ts";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/Sheet";


type FormPanelProps =
    FormContainerProps<MovieCreditDetails, MovieCredit, MovieCreditFormValues> & {
    /**
     * Optional custom trigger element for opening the panel.
     * Defaults to a simple text trigger when omitted.
     */
    children?: ReactNode;
};

/**
 * Side panel for submitting movie credits.
 *
 * - Adapts title and description based on create vs edit mode
 * - Closes automatically on successful submission
 * - Forwards submission results via `onSubmitSuccess`
 *
 * @example
 * ```tsx
 * <MovieCreditSubmitFormPanel isEditing={false}>
 *   <Button>Add Credit</Button>
 * </MovieCreditSubmitFormPanel>
 * ```
 */
const MovieCreditSubmitFormPanel = (
    {children, onSubmitSuccess, ...formProps}: FormPanelProps
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const action = formProps.editEntity ? "Update" : "Create";
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
    const closeOnSubmit = (credit: MovieCreditDetails) => {
        setIsOpen(false);
        onSubmitSuccess?.(credit);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>{children ?? "Open"}</SheetTrigger>

            <SheetContent className="flex flex-col">
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
