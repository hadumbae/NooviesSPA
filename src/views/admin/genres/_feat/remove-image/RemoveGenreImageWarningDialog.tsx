/**
 * @fileoverview Confirmation dialog for removing an image from a genre entity.
 */

import {ReactElement, ReactNode} from "react";
import {MutationResponseConfig} from "@/common/features/submit-data";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {UIOpenStateProps} from "@/common/types";
import {useRemoveGenreImage} from "@/domains/genres/_feat/manage-image";
import {Genre} from "@/domains/genres/schema";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/common/components/ui/alert-dialog.tsx";
import {ContainerCSS} from "@/common/constants/css/ContainerCSS.ts";

/** Props for the RemoveGenreImageWarningDialog component. */
type DialogProps = MutationResponseConfig<Genre> & UIOpenStateProps & {
    children?: ReactNode;
    _id: ObjectId;
    name: string;
};

/** Warning dialog to confirm the deletion of a genre image. */
export function RemoveGenreImageWarningDialog(
    {children, _id, name, isOpen, setIsOpen, ...onSubmit}: DialogProps
): ReactElement {
    const {mutate} = useRemoveGenreImage(onSubmit);

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent className={ContainerCSS}>
                <AlertDialogHeader>
                    <AlertDialogTitle className="primary-text">Remove image?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Remove image for `{name}`. This action cannot be reversed. Continue?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="shadcn-secondary-button">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => mutate({_id})}
                        className="shadcn-primary-button"
                    >
                        Remove Image
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}