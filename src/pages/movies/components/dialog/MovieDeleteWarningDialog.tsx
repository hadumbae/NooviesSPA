import {FC, ReactNode} from 'react';
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import useMovieDeleteMutation from "@/pages/movies/hooks/mutations/useMovieDeleteMutation.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";

/**
 * Props for the `MovieDeleteWarningDialog` component.
 */
type WarningDialogProps = OnDeleteMutationParams &
    PresetOpenState & {
    /** Optional React node rendered as the dialog trigger element (e.g., button or icon). */
    children?: ReactNode;

    /** The ID of the movie to delete. */
    movieID: ObjectId;

    /** Optional name of the movie for display in the dialog title. */
    movieName?: string;
};

/**
 * A confirmation dialog specifically for deleting a movie entity.
 *
 * Features:
 * - Wraps the generic `EntityDeleteWarningDialog` for consistent UI.
 * - Handles movie deletion via `useMovieDeleteMutation`.
 * - Dynamically generates the dialog title using the movie name if provided.
 * - Supports controlled or uncontrolled open state via `PresetOpenState`.
 * - Cleans up empty preset state attributes using `filterEmptyAttributes`.
 *
 * @param props - Props controlling the dialog, deletion behavior, and optional open state.
 * @param props.movieID - The ID of the movie to delete.
 * @param props.movieName - Optional movie name for the dialog title.
 * @param props.onDeleteSuccess - Optional callback invoked after successful deletion.
 * @param props.onDeleteError - Optional callback invoked if deletion fails.
 * @param props.presetOpen - Optional controlled open state for the dialog.
 * @param props.setPresetOpen - Optional setter for controlled open state.
 * @param props.children - Optional React node used as the trigger element for the dialog.
 */
const MovieDeleteWarningDialog: FC<WarningDialogProps> = (props) => {
    const {children, movieID, movieName, onDeleteSuccess, onDeleteError, presetOpen, setPresetOpen} = props;

    const displayName = movieName ? `"${movieName}"` : "movie";
    const dialogTitle = `Proceed to delete ${displayName}?`;

    // Filter out undefined preset state values for controlled/uncontrolled behavior
    const presetStates = filterNullishAttributes({presetOpen, setPresetOpen});

    // Setup delete mutation
    const {mutate} = useMovieDeleteMutation({onDeleteSuccess, onDeleteError});
    const deleteMovie = () => mutate({_id: movieID});

    return (
        <EntityDeleteWarningDialog
            title={dialogTitle}
            deleteResource={deleteMovie}
            {...presetStates}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
};

export default MovieDeleteWarningDialog;
