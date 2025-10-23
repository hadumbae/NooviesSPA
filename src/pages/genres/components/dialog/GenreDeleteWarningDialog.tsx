import {FC, PropsWithChildren} from 'react';
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import useGenreDeleteMutation from "@/pages/genres/hooks/useGenreDeleteMutation.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Props for the {@link GenreDeleteWarningDialog} component.
 *
 * Extends {@link MutationOnSubmitParams} for submission configuration,
 * omitting `onSubmitSuccess` and `onSubmitError` to redefine them with
 * deletion-specific signatures.
 */
type DialogProps = Omit<MutationOnSubmitParams, "onSubmitSuccess" | "onSubmitError"> & {
    /**
     * The unique identifier of the genre to be deleted.
     */
    genreID: ObjectId;

    /**
     * Optional human-readable name of the genre for display in the dialog title.
     */
    genreName?: string;

    /**
     * Optional callback invoked when the deletion succeeds.
     */
    onSubmitSuccess?: () => void;

    /**
     * Optional callback invoked when the deletion fails.
     * @param error - The error object from the failed mutation.
     */
    onSubmitError?: (error: unknown) => void;
};

/**
 * A confirmation dialog component for deleting a specific genre.
 *
 * This component wraps {@link EntityDeleteWarningDialog} to provide
 * a specialized delete confirmation flow for genre entities.
 * It integrates with {@link useGenreDeleteMutation} to execute
 * the deletion and trigger success or error callbacks.
 *
 * @component
 *
 * @param params - Component props.
 * @param params.genreID - The unique identifier of the genre to delete.
 * @param params.genreName - Optional name of the genre to display in the confirmation message.
 * @param params.successMessage - Optional toast message displayed after successful deletion.
 * @param params.errorMessage - Optional toast message displayed after failed deletion.
 * @param params.onSubmitSuccess - Callback executed on successful deletion.
 * @param params.onSubmitError - Callback executed on failed deletion.
 * @param params.children - Optional elements to render inside the dialog body.
 *
 * @example
 * ```tsx
 * <GenreDeleteWarningDialog
 *   genreID="64e9a4..."
 *   genreName="Jazz"
 *   successMessage="Genre deleted successfully."
 *   errorMessage="Could not delete genre."
 *   onSubmitSuccess={() => refreshGenres()}
 *   onSubmitError={(err) => console.error(err)}
 * >
 *   <p>This action cannot be undone.</p>
 * </GenreDeleteWarningDialog>
 * ```
 */
const GenreDeleteWarningDialog: FC<PropsWithChildren<DialogProps>> = (params) => {
    const {children, genreID, genreName, ...mutationParams} = params;

    const dialogTitle = `Proceed to delete ${genreName ?? "genre"}?`
    const {mutate} = useGenreDeleteMutation(mutationParams);

    const deleteGenre = () => {
        mutate({_id: genreID});
    }

    return (
        <EntityDeleteWarningDialog
            title={dialogTitle}
            deleteResource={deleteGenre}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
};

export default GenreDeleteWarningDialog;
