/**
 * @fileoverview Slide-over panel for uploading images associated with a specific genre.
 */

import {ReactElement, ReactNode} from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/Sheet";
import {Button} from "@/common/components/ui/button.tsx";
import {UIOpenStateProps} from "@/common/types";
import {GenreImageUploadFormView} from "@/views/admin/genres/_feat/image-upload-form/GenreImageUploadFormView.tsx";
import {useBaseFormContext} from "@/common/features/generic-form-context";

/** Props for the GenreImageUploadPanel component. */
type PanelProps = UIOpenStateProps & {
    children?: ReactNode;
};

/**
 * Displays a sheet containing the genre image upload form.
 */
export function GenreImageUploadPanel(
    {children, isOpen, setIsOpen}: PanelProps
): ReactElement {
    const {formID} = useBaseFormContext();

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>{children}</SheetTrigger>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Upload Image</SheetTitle>
                    <SheetDescription>
                        Upload images for the genre. Select the image and click on "Upload".
                    </SheetDescription>
                </SheetHeader>

                <GenreImageUploadFormView className="pb-4"/>

                <SheetFooter>
                    <Button variant="default" type="submit" form={formID}>
                        Upload
                    </Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}