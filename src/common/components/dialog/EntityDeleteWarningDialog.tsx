import {FC, ReactNode} from 'react';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/common/components/ui/alert-dialog.tsx";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";
import usePresetActiveOpen from "@/common/hooks/usePresetActiveOpen.ts";

/**
 * Props for the `EntityDeleteWarningDialog` component.
 */
type DialogProps = PresetOpenState & {
    /** Optional React node rendered as the dialog trigger. */
    children?: ReactNode;

    /** Title text displayed at the top of the dialog. Defaults to a generic warning. */
    title?: string;

    /** Description text displayed below the title. Defaults to a generic delete warning. */
    description?: string;

    /** Callback invoked when the "Delete" action is confirmed. */
    deleteResource: () => void;
};

/**
 * A confirmation dialog for deleting a resource, with controlled or uncontrolled open state.
 *
 * Features:
 * - Displays a title and description warning the user about deletion consequences.
 * - Supports controlled open state via `presetOpen`/`setPresetOpen` or uses internal state if not provided.
 * - Provides Cancel and Delete actions. Cancel closes the dialog, Delete calls the `deleteResource` callback.
 *
 * @param props - Props controlling dialog content, trigger, and open state.
 * @param props.children - Optional trigger element (e.g., button or icon) to open the dialog.
 * @param props.title - Optional title text for the dialog.
 * @param props.description - Optional description text for the dialog.
 * @param props.deleteResource - Callback invoked when the user confirms deletion.
 * @param props.presetOpen - Controlled open state (optional).
 * @param props.setPresetOpen - Setter for controlled open state (optional).
 */
const EntityDeleteWarningDialog: FC<DialogProps> = (props) => {
    const {children, title, description, deleteResource, presetOpen, setPresetOpen} = props;

    // Determine controlled vs internal state
    const {activeOpen, setActiveOpen} = usePresetActiveOpen({presetOpen, setPresetOpen});

    // Default text if not provided
    const dialogTitle = title ?? "Proceed to delete resource?";
    const dialogDescription = description ??
        "This action cannot be reversed. Related data will also be removed. Do you want to proceed?";

    return (
        <AlertDialog open={activeOpen} onOpenChange={setActiveOpen}>
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
