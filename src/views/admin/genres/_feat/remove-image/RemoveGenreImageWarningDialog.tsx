/**
 * @fileoverview Confirmation dialog for removing an image from a genre entity.
 */

import {ReactElement, ReactNode} from "react";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {ObjectId} from "@/common/_schemas";
import {UIOpenStateProps} from "@/common/_types";
import {Genre, useRemoveGenreImage} from "@/domains/genres";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/views/common/_comp/ui";
import {handleMutateAsync} from "@/common/_feat";

/** Props for the RemoveGenreImageWarningDialog component. */
type DialogProps = UIOpenStateProps & MutationResponseConfig<Genre, { _id: ObjectId }> & {
    children?: ReactNode;
    _id: ObjectId;
    name: string;
};

/** Warning dialog to confirm the deletion of a genre image. */
export function RemoveGenreImageWarningDialog(
    {children, _id, name, isOpen, setIsOpen, ...onSubmitConfig}: DialogProps
): ReactElement {
    const {mutateAsync, isPending} = useRemoveGenreImage(onSubmitConfig);

    const removeImage = handleMutateAsync({
        mutateAsync,
        ...onSubmitConfig
    })

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger disabled={isPending} asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent className="default-container">
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
                        onClick={() => removeImage({_id})}
                        className="shadcn-primary-button"
                        disabled={isPending}
                    >
                        Removing
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}