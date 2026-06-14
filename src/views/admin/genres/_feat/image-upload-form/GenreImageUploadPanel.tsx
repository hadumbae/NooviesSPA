/**
 * @fileoverview Slide-over panel for uploading images associated with a specific genre.
 */

import {ReactElement, ReactNode} from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/sheet";
import {Button} from "@/common/components/ui/button.tsx";
import {UIOpenStateProps} from "@/common/types";
import {GenreImageUploadFormView} from "@/views/admin/genres/_feat/image-upload-form/GenreImageUploadFormView.tsx";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import AnimatedLoader from "@/common/components/loaders/AnimatedLoader.tsx";
import {useLockForFormUI} from "@/common/hooks/forms/useLockForFormUI.ts";

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
    const {formID, isPending, isError} = useBaseFormContext();

    const {isUILocked} = useLockForFormUI({
        isContentOpen: isOpen,
        isMutationPending: isPending,
        isMutationError: isError,
    });

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
                    <Button variant="default" type="submit" form={formID} disabled={isUILocked}>
                        {isPending ? <AnimatedLoader/> : "Upload"}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}