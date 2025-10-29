import {FC} from 'react';
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import useMoviePosterImageDeleteMutation
    from "@/pages/movies/hooks/admin/poster-image/useMoviePosterImageDeleteMutation.ts";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";

type DialogProps = Omit<OnDeleteMutationParams, "onDeleteSuccess"> & PresetOpenState & {
    onDeleteSuccess?: (movie: Movie) => void;
    movieID: ObjectId;
}

const MoviePosterImageDeleteDialog: FC<DialogProps> = (props) => {
    const {movieID, presetOpen, setPresetOpen, ...mutationParams} = props;

    const {mutate} = useMoviePosterImageDeleteMutation(mutationParams);
    const deletePosterImage = () => mutate({movieID});

    const title = "Delete Movie Poster Image?";
    const description = "Delete movie's poster image? This is an irreversible action.";

    const presetProps: PresetOpenState = filterNullishAttributes({presetOpen, setPresetOpen});

    return (
        <EntityDeleteWarningDialog
            title={title}
            description={description}
            deleteResource={deletePosterImage}
            {...presetProps}
        />
    );
};

export default MoviePosterImageDeleteDialog;
