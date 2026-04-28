/** @fileoverview Confirmation dialog for deleting a movie entity with integrated mutation logic. */

import {ReactElement, ReactNode} from 'react';
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import useMovieDeleteMutation from "@/domains/movies/_feat/crud-hooks/useMovieDeleteMutation.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import {MutationResponseConfig} from "@/common/features/submit-data";
import {UIOpenStateProps} from "@/common/types";

/** Props for the MovieDeleteWarningDialog component, supporting controlled UI states and deletion callbacks. */
type WarningDialogProps = MutationResponseConfig & UIOpenStateProps & {
    children?: ReactNode;
    movieID: ObjectId;
    movieName?: string;
};

/** Renders a confirmation dialog that triggers a movie deletion mutation upon user confirmation. */
export function MovieDeleteWarningDialog(props: WarningDialogProps): ReactElement {
    const {children, movieID, movieName, isOpen, setIsOpen, ...deleteProps} = props;

    const displayName = movieName ? `"${movieName}"` : "movie";
    const dialogTitle = `Proceed to delete ${displayName}?`;

    const {mutate} = useMovieDeleteMutation(deleteProps);
    const deleteMovie = () => mutate({_id: movieID});

    return (
        <EntityDeleteWarningDialog
            title={dialogTitle}
            deleteResource={deleteMovie}
            presetOpen={isOpen}
            setPresetOpen={setIsOpen}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}