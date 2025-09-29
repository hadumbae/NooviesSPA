import {FC, ReactNode, useState} from 'react';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/common/components/ui/alert-dialog.tsx";
import {PresetOpenState} from "@/common/type/OpenStateProps.ts";

/**
 * Props for the `EntityDeleteWarningDialog` component.
 *
 * @property children - The element that triggers the dialog when clicked.
 * @property title - Optional custom title for the dialog.
 * @property description - Optional custom description for the dialog.
 * @property deleteResource - Callback function invoked when the "Delete" action is confirmed.
 * @property presetOpen - Optional controlled open state for the dialog.
 * @property setPresetOpen - Optional setter for controlled open state.
 */
type DialogProps = PresetOpenState & {
    children?: ReactNode;
    title?: string;
    description?: string;
    deleteResource: () => void;
};

/**
 * A reusable confirmation dialog for deleting entities.
 *
 * @remarks
 * This component renders a modal dialog asking the user to confirm deletion of a resource.
 * - Uses `AlertDialog` components for accessibility and consistent styling.
 * - Supports optional preset open state (`presetOpen` / `setPresetOpen`) for controlled usage.
 * - Defaults to generic title and description if not provided via props.
 *
 * The "Delete" button executes the provided `deleteResource` callback, while "Cancel" closes the dialog.
 *
 * @example
 * ```tsx
 * <EntityDeleteWarningDialog deleteResource={handleDelete}>
 *   <Button>Delete Item</Button>
 * </EntityDeleteWarningDialog>
 * ```
 */
const EntityDeleteWarningDialog: FC<DialogProps> = (props) => {
    const {children, title, description, deleteResource, presetOpen, setPresetOpen} = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const dialogTitle = title ?? "Proceed to delete resource?";
    const dialogDescription = description ??
        "This action cannot be reversed. Related data will also be removed. Do you want to proceed?";

    return (
        <AlertDialog open={presetOpen ?? isOpen} onOpenChange={setPresetOpen ?? setIsOpen}>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
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
