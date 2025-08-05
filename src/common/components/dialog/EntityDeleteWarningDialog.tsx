import {FC, PropsWithChildren} from 'react';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/common/components/ui/alert-dialog.tsx";

/**
 * Props for the {@link ScreenDeleteWarningDialog} component.
 */
type DialogProps = {
    /**
     * Optional custom title for the dialog.
     * Defaults to `"Proceed to delete resource?"` if not provided.
     */
    title?: string;

    /**
     * Optional custom description for the dialog.
     * Defaults to a warning message if not provided.
     */
    description?: string;

    /**
     * Callback function executed when the user confirms deletion.
     */
    deleteResource: () => void;
};

/**
 * A reusable warning dialog for confirming deletion actions.
 * Displays a confirmation message with optional title and description,
 * and calls `deleteResource` when the user confirms.
 *
 * @component
 * @example
 * ```tsx
 * <ScreenDeleteWarningDialog deleteResource={() => handleDelete()}>
 *   <button>Delete Screen</button>
 * </ScreenDeleteWarningDialog>
 * ```
 *
 * @param {PropsWithChildren<DialogProps>} params - The props object including optional children.
 * @param {React.ReactNode} [params.children] - Optional trigger element (defaults to "Delete" button if not provided).
 * @param {string} [params.title] - Optional dialog title.
 * @param {string} [params.description] - Optional dialog description.
 * @param {() => void} params.deleteResource - Function to execute on deletion confirmation.
 *
 * @returns {JSX.Element} A confirmation dialog for deletion.
 */
const EntityDeleteWarningDialog: FC<PropsWithChildren<DialogProps>> = (params) => {
    const {children, title, description, deleteResource} = params;

    const dialogTitle = title ??
        "Proceed to delete resource?";

    const dialogDescription = description ??
        "This action cannot be reversed. Related data will also be removed. Do you want to proceed?";

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children ? children : "Delete"}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
                    <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteResource}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default EntityDeleteWarningDialog;
