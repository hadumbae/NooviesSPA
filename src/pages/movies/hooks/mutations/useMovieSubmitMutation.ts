import {UseFormReturn} from "react-hook-form";
import mutationFormSubmitHandler from "@/common/handlers/mutation/MutationFormSubmitHandler.ts";
import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import {Movie, MovieSchema} from "@/pages/movies/schema/model/MovieSchema.ts";
import {MovieSubmit} from "@/pages/movies/schema/form/MovieSubmitSchema.ts";

interface Params {
    _id?: string,
    form: UseFormReturn<MovieSubmit>,
    onSubmit?: (movie: Movie) => void,
}

export default function useMovieSubmitMutation(
    {_id, form, onSubmit}: Params
) {
    const repository = MovieRepository;
    const entityName = "Movie";
    const mutationKey = ['submit_movie_data'];
    const schema = MovieSchema;

    return mutationFormSubmitHandler<Movie, typeof schema, MovieSubmit>({
        _id,
        repository,
        entityName,
        mutationKey,
        form,
        schema,
        onSubmit,
    });
}