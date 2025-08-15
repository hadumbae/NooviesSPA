import {UseFormReturn} from "react-hook-form";
import mutationFormSubmitHandler from "@/common/handlers/mutation/MutationFormSubmitHandler.ts";
import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import {MovieSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import {MovieForm} from "@/pages/movies/schema/form/MovieForm.types.ts";

interface Params {
    _id?: string,
    form: UseFormReturn<MovieForm>,
    onSubmit?: (movie: Movie) => void,
}

export default function useMovieSubmitMutation(
    {_id, form, onSubmit}: Params
) {
    const repository = MovieRepository;
    const entityName = "Movie";
    const mutationKey = ['submit_movie_data'];
    const schema = MovieSchema;

    return mutationFormSubmitHandler<Movie, typeof schema, MovieForm>({
        _id,
        repository,
        entityName,
        mutationKey,
        form,
        schema,
        onSubmit,
    });
}