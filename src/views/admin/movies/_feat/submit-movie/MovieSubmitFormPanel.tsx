/**
 * @fileoverview Slide-over panel component for creating or editing movie records.
 */

import {ReactElement} from 'react';
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/Sheet";


import {UIOpenStateProps} from "@/common/types";
import {FormViewProps} from "@/common/features/submit-data/formTypes.ts";
import {MovieFormStarterValues} from "@/domains/movies/_feat/submit-data";
import {MovieSubmitFormView} from "@/views/admin/movies/_feat/submit-movie/MovieSubmitFormView.tsx";
import {MovieSubmitFormActions} from "@/views/admin/movies/_feat/submit-movie/MovieSubmitFormActions.tsx";

/** Props for the MovieSubmitFormPanel component. */
type FormPanelProps = Omit<FormViewProps<MovieFormStarterValues>, "isNestedView"> & UIOpenStateProps & {
    isEditing?: boolean;
};

/**
 * Slide-over panel that wraps the movie submission form and its associated actions.
 */
export function MovieSubmitFormPanel(
    {children, isEditing, isOpen, setIsOpen, ...viewProps}: FormPanelProps
): ReactElement {
    const action = isEditing ? "Update" : "Create";
    const sheetTitle = `${action} Movie`;
    const sheetDescription = `${action} your movie here by submitting data with the form.`;

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow px-1">
                    <div className="space-y-5">
                        <MovieSubmitFormView {...viewProps}/>
                        <MovieSubmitFormActions/>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
