/** @fileoverview Side-panel wrapper for the movie credit form, managing its visibility and lifecycle. */

import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/Sheet";

import {MovieCreditFormValues} from "@/domains/moviecredit/_feat/submit-data/schemas/MovieCreditFormValues.ts";
import {FormViewProps} from "@/common/features/submit-data/formTypes.ts";
import {UIOpenStateProps} from "@/common/types";
import {MovieCreditFormView} from "@/views/admin/movie-credits/_comp/forms/form-view/MovieCreditFormView.tsx";
import {ReactElement} from "react";

/** Props for the MovieCreditFormPanel component, extending form and UI state definitions. */
type FormPanelProps = FormViewProps<MovieCreditFormValues> & UIOpenStateProps & {
    isEditing?: boolean;
};

/**
 * Renders a slide-out sheet containing the movie credit form.
 */
export function MovieCreditFormPanel(
    {children, isOpen, setIsOpen, isEditing, className, disableFields}: FormPanelProps
): ReactElement {
    const action = isEditing ? "Update" : "Create";
    const sheetTitle = `${action} Movie Credits`;
    const sheetDescription = `${action} movie credits by submitting data.`;

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>{children ?? "Open"}</SheetTrigger>

            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-1">
                    <MovieCreditFormView
                        className={className}
                        disableFields={disableFields}
                    />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}