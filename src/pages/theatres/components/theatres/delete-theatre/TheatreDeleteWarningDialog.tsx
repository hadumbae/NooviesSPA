import { FC, PropsWithChildren } from 'react';
import useTheatreDeleteMutation from "@/pages/theatres/hooks/features/delete-theatre/useTheatreDeleteMutation.ts";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/common/components/ui/alert-dialog.tsx";
import { OnDeleteMutationParams } from "@/common/type/form/MutationDeleteParams.ts";

/**
 * Props for {@link TheatreDeleteWarningDialog}.
 *
 * Extends {@link OnDeleteMutationParams} for deletion callbacks and messages.
 *
 * @property theatreName - Optional display name of the theatre for dialog title.
 * @property theatreID - Required ID of the theatre to delete.
 */
type DeleteMutationProps = OnDeleteMutationParams & {
    theatreName?: string;
    theatreID: ObjectId;
};

/**
 * **TheatreDeleteWarningDialog**
 *
 * A confirmation dialog component to delete a theatre.
 * - Uses {@link useTheatreDeleteMutation} to perform deletion.
 * - Displays an alert dialog with a customizable title and warning description.
 * - Supports optional children to replace the default trigger button.
 *
 * @param params - Component props including theatre info and delete mutation options.
 * @param params.children - Optional trigger element for the dialog. Defaults to a "Delete" span.
 *
 * @example
 * ```tsx
 * <TheatreDeleteWarningDialog
 *   theatreID="66b9d1b8c35f2a0012cd90f0"
 *   theatreName="Grand Theatre"
 *   successMessage="Theatre deleted successfully!"
 *   onDeleteSuccess={() => console.log("Theatre deleted")}
 *   errorMessage="Failed to delete theatre"
 * >
 *   <Button variant="destructive">Delete Theatre</Button>
 * </TheatreDeleteWarningDialog>
 * ```
 */
const TheatreDeleteWarningDialog: FC<PropsWithChildren<DeleteMutationProps>> = (params) => {
    const { children, theatreName, theatreID, ...mutationOptions } = params;

    const { mutate } = useTheatreDeleteMutation(mutationOptions);

    const dialogTitle = `Proceed to delete ${theatreName ?? "theatre"}?`;
    const deleteTheatre = () => mutate({ _id: theatreID });

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children ? children : <span>Delete</span>}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be reversed. Related data will also be removed. Do you want to proceed?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteTheatre}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default TheatreDeleteWarningDialog;
