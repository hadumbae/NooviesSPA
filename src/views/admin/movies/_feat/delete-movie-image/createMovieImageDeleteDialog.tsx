/**
 * @fileoverview Factory for creating confirmation dialog components to delete movie poster or banner images.
 */

import {ReactElement} from 'react';
import {EntityDeleteWarningDialog} from "@/views/common/_feat/dialog/EntityDeleteWarningDialog.tsx";
import {ObjectId} from "@/common/_schemas";
import {DeleteMovieImageConfig, RemoveMovieImageMutation} from "@/domains/movies/_feat/manage-images";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {UIOpenStateProps} from "@/common/_types";
import {Movie} from "@/domains/movies/_schema/movie";
import {handleMutateAsync} from "@/common/_feat/handle-mutate-async/handleMutateAsync.ts";

type FactoryConfig = {
    title: string;
    description: string;
    mutation: RemoveMovieImageMutation;
}

/** Props for the generated movie image deletion dialog component. */
type DialogProps = MutationResponseConfig<Movie, DeleteMovieImageConfig> & UIOpenStateProps & {
    movieID: ObjectId;
}

/**
 * Creates a movie image delete dialog component configured with the given deletion mutation, title, and description.
 */
export function createMovieImageDeleteDialog(
    {title, description, mutation}: FactoryConfig
) {
    function DeleteDialog(
        {movieID, isOpen, setIsOpen, ...submitConfig}: DialogProps
    ): ReactElement {
        const {mutateAsync} = mutation();
        const deletePosterImage = handleMutateAsync({
            mutateAsync,
            ...submitConfig,
        });

        return (
            <EntityDeleteWarningDialog
                title={title}
                description={description}
                deleteResource={() => deletePosterImage({movieID})}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        );
    }

    return {
        DeleteDialog,
    }
}