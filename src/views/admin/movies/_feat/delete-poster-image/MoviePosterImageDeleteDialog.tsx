/**
 * @fileoverview A confirmation dialog for deleting a movie's poster image.
 */

import {ReactElement} from 'react';
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useMoviePosterImageDeleteMutation} from "@/domains/movies/_feat/manage-images";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {UIOpenStateProps} from "@/common/types";
import {Movie} from "@/domains/movies/schema/movie";

/** Props for the MoviePosterImageDeleteDialog component. */
type DialogProps = MutationResponseConfig<Movie> & UIOpenStateProps & {
    movieID: ObjectId;
}

/** Confirmation dialog that triggers the movie poster image deletion process. */
export function MoviePosterImageDeleteDialog(props: DialogProps): ReactElement {
    const {movieID, isOpen, setIsOpen, ...mutationParams} = props;

    const {mutate} = useMoviePosterImageDeleteMutation(mutationParams);
    const deletePosterImage = () => mutate({movieID});

    const title = "Remove Movie Poster Image?";
    const description = "Remove the movie's poster image? This is an irreversible action.";

    return (
        <EntityDeleteWarningDialog
            title={title}
            description={description}
            deleteResource={deletePosterImage}
            presetOpen={isOpen}
            setPresetOpen={setIsOpen}
        />
    );
}
