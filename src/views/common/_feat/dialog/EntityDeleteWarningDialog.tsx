/**
 * @fileoverview A reusable alert dialog for confirming the deletion of a resource.
 */

import {ReactElement, ReactNode} from 'react';
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
} from "@/common/components/ui";
import {UIOpenStateProps} from "@/common/_types";

/** Props for the EntityDeleteWarningDialog component. */
type DialogProps = UIOpenStateProps & {
    children?: ReactNode;
    title?: string;
    description?: string;
    deleteResource: () => void;
};

/**
 * A confirmation dialog that warns users about the destructive nature of deleting an entity.
 */
export function EntityDeleteWarningDialog(
    {children, title, description, deleteResource, isOpen, setIsOpen}: DialogProps
): ReactElement {
    const dialogTitle = title ?? "Proceed to delete resource?";
    const dialogDescription = description ?? "This action cannot be reversed. Related data will also be removed. Do you want to proceed?";

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent className="default-container">
                <AlertDialogHeader>
                    <AlertDialogTitle className="primary-text">{dialogTitle}</AlertDialogTitle>
                    <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="dialog-close-btn">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteResource} className="dialog-action-btn">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}