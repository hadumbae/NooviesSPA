/**
 * @fileoverview Slide-over panel for uploading and submitting movie poster images.
 */

import {ReactElement, ReactNode} from 'react';
import {UIOpenStateProps} from "@/common/_types";
import {cn, useBaseFormContext, useLockForFormUI} from "@/common/_feat";
import {
    MovieImageSubmitFormView
} from "@/views/admin/movies/_feat/submit-movie-image/MovieImageSubmitFormView.tsx";
import {
    MovieImageSubmitFormActions
} from "@/views/admin/movies/_feat/submit-movie-image/MovieImageSubmitFormActions.tsx";
import {
    ScrollArea,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/views/common/_comp/ui";

/** Props for the MoviePosterImageSubmitFormPanel component. */
type FormPanelProps = UIOpenStateProps & {
    children?: ReactNode;
    className?: string;
    title: string;
    description: string;
};

/**
 * Slide-over panel that provides a form for uploading a movie poster image.
 */
export function MovieImageSubmitFormPanel(
    {children, isOpen, setIsOpen, title, description, className}: FormPanelProps
): ReactElement {
    const {isPending, isError} = useBaseFormContext();
    const {isUILocked} = useLockForFormUI({
        isContentOpen: isOpen,
        isMutationPending: isPending,
        isMutationError: isError,
    })

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>{description}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex flex-grow">
                    <div className={cn("space-y-3", className)}>
                        <MovieImageSubmitFormView/>
                        <MovieImageSubmitFormActions disabled={isUILocked} classNames={{button: "w-full"}}/>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}


