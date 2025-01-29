import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {MovieSubmit, MovieSubmitSchema} from "@/pages/movies/schema/MovieSubmitSchema.ts";
import {Movie} from "@/pages/movies/schema/MovieSchema.ts";
import convertObjectsToIDs from "@/common/utility/convertObjectsToIDs.ts";

export default function useMovieSubmitForm(params?: {movie?: Movie}) {
    const {movie} = params || {};

    const defaultValues: MovieSubmit = {
        title: "",
        description: "",
        genres: [],
        directors: [],
        cast: [],
        releaseDate: undefined,
        durationInMinutes: "",
        languages: [],
        subtitles: [],
        trailerURL: "",
        price: "",
    }

    let genres = movie?.genres.map(convertObjectsToIDs) || defaultValues.genres;
    let directors = movie?.directors.map(convertObjectsToIDs) || defaultValues.directors;
    let cast = movie?.cast.map(convertObjectsToIDs) || defaultValues.cast;

    return useForm<MovieSubmit>({
        resolver: zodResolver(MovieSubmitSchema),
        defaultValues: {
            ...defaultValues,
            ...(movie ? movie : {}),
            genres,
            directors,
            cast,
        },
    });
}