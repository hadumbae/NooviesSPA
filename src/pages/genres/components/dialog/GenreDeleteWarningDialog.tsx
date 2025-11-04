import {FC, ReactNode} from 'react';
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import useGenreDeleteMutation from "@/pages/genres/hooks/useGenreDeleteMutation.ts";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";

/**
 * Props for the {@link GenreDeleteWarningDialog} component.
 *
 * @remarks
 * Extends deletion mutation parameters with optional dialog open-state control.
 * This component renders a confirmation dialog for deleting a genre record.
 *
 * @property genreID - The unique {@link ObjectId} of the genre to delete.
 * @property genreName - Optional display name shown in the dialog title.
 * @property children - Optional trigger element (e.g., a button).
 */
type DialogProps = OnDeleteMutationParams & PresetOpenState & {
    children?: ReactNode;
    genreID: ObjectId;
    genreName?: string;
};

/**
 * A confirmation dialog for deleting a {@link Genre}.
 *
 * @remarks
 * Wraps {@link EntityDeleteWarningDialog} and integrates with
 * {@link useGenreDeleteMutation} to perform the deletion request.
 *
 * Supports both controlled and uncontrolled open states via {@link PresetOpenState}.
 * The dialog dynamically updates its title based on the provided `genreName`.
 *
 * @example
 * ```tsx
 * <GenreDeleteWarningDialog
 *   genreID={genre._id}
 *   genreName={genre.name}
 *   onDeleteSuccess={refreshGenres}
 * >
 *   <Button variant="destructive">Delete</Button>
 * </GenreDeleteWarningDialog>
 * ```
 */
const GenreDeleteWarningDialog: FC<DialogProps> = (params) => {
    const {children, genreID, genreName, presetOpen, setPresetOpen, ...mutationParams} = params;

    /**
     * ⚡ Dialog Setup ⚡
     * Prepares title and optional preset open-state values.
     */
    const dialogTitle = `Proceed to delete ${genreName ?? "genre"}?`;
    const presetStates: PresetOpenState = filterNullishAttributes({presetOpen, setPresetOpen});

    /**
     * ⚡ Mutation ⚡
     * Binds the delete mutation to the current genre ID.
     */
    const {mutate} = useGenreDeleteMutation(mutationParams);
    const deleteGenre = () => mutate({_id: genreID});

    /**
     * ⚡ Render ⚡
     * Renders the dialog with the dynamic title and bound mutation handler.
     */
    return (
        <EntityDeleteWarningDialog
            title={dialogTitle}
            deleteResource={deleteGenre}
            {...presetStates}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
};

export default GenreDeleteWarningDialog;
