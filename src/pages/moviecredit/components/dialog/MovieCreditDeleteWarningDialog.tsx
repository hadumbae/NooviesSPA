import {FC, ReactNode} from 'react';
import {OnDeleteMutationParams} from "@/common/type/form/FormMutationResultParams.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import useMovieCreditDeleteMutation from "@/pages/moviecredit/hooks/mutations/useMovieCreditDeleteMutation.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";

/**
 * Props for the {@link MovieCreditDeleteWarningDialog} component.
 */
type WarningDialogProps = OnDeleteMutationParams & {
    /**
     * Optional trigger element for the dialog.
     * If not provided, the default "Delete" trigger from `EntityDeleteWarningDialog` is used.
     */
    children?: ReactNode;

    /**
     * The unique identifier of the movie credit to be deleted.
     */
    _id: ObjectId;

    /**
     * Optional display text for the item being deleted, used in the dialog title.
     * Defaults to `"credit"` if not provided.
     */
    displayText?: string;

    /**
     * Optional description text for the dialog body.
     * Defaults to the generic warning message in `EntityDeleteWarningDialog` if not provided.
     */
    displayDescription?: string;
}

/**
 * A confirmation dialog specifically for deleting a movie credit.
 *
 * Wraps the generic {@link EntityDeleteWarningDialog} and passes a `deleteResource` callback
 * that triggers the `useMovieCreditDeleteMutation` hook.
 *
 * @component
 * @example
 * ```tsx
 * <MovieCreditDeleteWarningDialog _id={creditId} displayText="Actor Credit" displayDescription="This action cannot be undone." onSuccess={handleSuccess}>
 *   <button>Delete Credit</button>
 * </MovieCreditDeleteWarningDialog>
 * ```
 *
 * @param {WarningDialogProps} props - The props for the dialog.
 * @param {ReactNode} [props.children] - Optional trigger element.
 * @param {ObjectId} props._id - The ID of the movie credit to delete.
 * @param {string} [props.displayText] - Optional text to display in the dialog title.
 * @param {string} [props.displayDescription] - Optional text to display in the dialog description.
 * @param {...OnDeleteMutationParams} props - Additional mutation parameters like `onSuccess` or `onError`.
 *
 * @returns {JSX.Element} A deletion confirmation dialog for a movie credit.
 */
const MovieCreditDeleteWarningDialog: FC<WarningDialogProps> = (props) => {
    const {children, _id, displayText, displayDescription, ...deleteParams} = props;

    const dialogTitle = `Proceed to delete ${displayText ?? "credit"}?`;
    const {mutate} = useMovieCreditDeleteMutation(deleteParams);

    const deleteCredit = () => {
        mutate({_id: _id});
    }

    return (
        <EntityDeleteWarningDialog
            title={dialogTitle}
            description={displayDescription}
            deleteResource={deleteCredit}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
};

export default MovieCreditDeleteWarningDialog;
