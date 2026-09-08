/** @fileoverview Movie poster component with fallback states and a zoomable dialog view. */

import {ReactElement, useState} from 'react';
import {cn} from "@/common/_feat";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/views/common/_comp/ui/dialog.tsx";
import {Image} from "@/views/common/_comp";

/** Props for the MoviePosterImageDialog component. */
type PosterProps = {
    src?: string | null;
    alt?: string;
    className?: string;
    classNames?: {
        base?: string;
        dialog?: string;
    };
};

/**
 * Renders a movie poster image that handles loading errors and missing sources.
 */
export function MoviePosterImageDialog(
    {src, alt, classNames}: PosterProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div>
            <Image
                src={src}
                alt={alt}
                className={cn("cursor-pointer", classNames?.base)}
                onClick={() => setIsOpen(true)}
            />

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="p-0 bg-transparent border-0">
                    <DialogHeader className="sr-only">
                        <DialogTitle>Poster Image</DialogTitle>
                        <DialogDescription>{alt}</DialogDescription>
                    </DialogHeader>

                    <Image src={src} alt={alt} className={classNames?.dialog}/>
                </DialogContent>
            </Dialog>
        </div>

    );
}