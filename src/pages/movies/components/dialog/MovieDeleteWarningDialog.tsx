import {FC, PropsWithChildren} from 'react';
import {OnDeleteMutationParams} from "@/common/type/form/FormMutationResultParams.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import useMovieDeleteMutation from "@/pages/movies/hooks/mutations/useMovieDeleteMutation.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";

/**
 * Props for {@link MovieDeleteWarningDialog}.
 */
type WarningDialogProps = OnDeleteMutationParams & {
    /** The unique identifier of the movie to be deleted. */
    movieID: ObjectId;

    /** Optional display name of the movie in the dialog. Defaults to `"movie"` if not provided. */
    movieName?: string;
};

/**
 * A warning dialog component for confirming the deletion of a movie.
 *
 * This component:
 * - Displays a confirmation dialog with the movie name.
 * - Executes a delete mutation when confirmed.
 * - Supports optional success and error callbacks via {@link OnDeleteMutationParams}.
 * - Wraps any children inside the `EntityDeleteWarningDialog` component.
 *
 * @param props - Props including movie ID, optional movie name, children, and delete mutation callbacks.
 *
 * @example
 * ```tsx
 * <MovieDeleteWarningDialog
 *   movieID="abc123"
 *   movieName="Inception"
 *   onDeleteSuccess={() => refetchMovies()}
 * >
 *   <button>Delete</button>
 * </MovieDeleteWarningDialog>
 * ```
 */
const MovieDeleteWarningDialog: FC<PropsWithChildren<WarningDialogProps>> = (props) => {
    const {children, movieID, movieName, onDeleteSuccess, onDeleteError} = props;

    const displayName = movieName ? `"${movieName}"` : "movie";
    const dialogTitle = `Proceed to delete ${displayName}?`;

    const {mutate} = useMovieDeleteMutation({onDeleteSuccess, onDeleteError});
    const deleteMovie = () => mutate({_id: movieID});

    return (
        <EntityDeleteWarningDialog title={dialogTitle} deleteResource={deleteMovie}>
            {children}
        </EntityDeleteWarningDialog>
    );
};

export default MovieDeleteWarningDialog;
