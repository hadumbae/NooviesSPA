/** @fileoverview Side-panel wrapper for the movie credit form, managing its visibility and lifecycle. */

import {ReactElement, ReactNode} from "react";
import {DisableFields, UIOpenStateProps} from "@/common/types";
import {MovieCreditFormView} from "@/views/admin/movie-credits/_feat/submit-form/views/MovieCreditFormView.tsx";
import {
    ScrollArea,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/common/components/ui";

import {MovieCreditFormValues} from "@/domains/movie-credits";
import {MovieCreditFormActions} from "@/views/admin/movie-credits";

/** Props for the MovieCreditFormPanel component, extending form and UI state definitions. */
type FormPanelProps = UIOpenStateProps & {
    children?: ReactNode;
    isEditing?: boolean;
    className?: string;
    disableFields?: DisableFields<MovieCreditFormValues>
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
                    <div className="space-y-4">
                        <MovieCreditFormView className={className} disableFields={disableFields}/>
                        <MovieCreditFormActions/>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}