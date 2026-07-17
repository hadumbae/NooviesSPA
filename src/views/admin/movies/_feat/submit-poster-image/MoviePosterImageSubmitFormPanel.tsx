/**
 * @fileoverview Slide-over panel for uploading and submitting movie poster images.
 */

import {ReactElement, ReactNode} from 'react';
import {UIOpenStateProps} from "@/common/_types";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {
    ScrollArea,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui";
import {
    MoviePosterImageSubmitFormView
} from "@/views/admin/movies/_feat/submit-poster-image/MoviePosterImageSubmitFormView.tsx";
import {
    MoviePosterImageSubmitFormActions
} from "@/views/admin/movies/_feat/submit-poster-image/MoviePosterImageSubmitFormActions.tsx";

/** Props for the MoviePosterImageSubmitFormPanel component. */
type FormPanelProps = UIOpenStateProps & {
    children?: ReactNode;
    className?: string;
};

/**
 * Slide-over panel that provides a form for uploading a movie poster image.
 */
export function MoviePosterImageSubmitFormPanel(
    {children, isOpen, setIsOpen, className}: FormPanelProps
): ReactElement {

    const title = "Upload Poster Image";
    const description = "Upload poster image here. Select image and upload.";

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
                        <MoviePosterImageSubmitFormView/>
                        <MoviePosterImageSubmitFormActions classNames={{button: "w-full"}}/>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}


