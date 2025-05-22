import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {MovieSubmit, MovieSubmitSchema} from "@/pages/movies/schema/form/MovieSubmitSchema.ts";
import {Movie} from "@/pages/movies/schema/model/MovieSchema.ts";
import convertObjectsToIDs from "@/common/utility/convertObjectsToIDs.ts";

export default function useMovieSubmitForm(params?: {movie?: Movie}) {
    const {movie} = params || {};

    const defaultValues: MovieSubmit = {
        title: movie ? movie.title : "",
        originalTitle: movie ? movie.originalTitle : "",
        tagline: movie ? movie.tagline : "",
        country: movie ? movie.country : "",
        synopsis: movie ? movie.synopsis : "",
        genres: movie ? movie.genres.map(convertObjectsToIDs) : [],
        releaseDate: movie ? movie.releaseDate : "",
        runtime: movie ? movie.runtime : "",
        originalLanguage: movie ? movie.originalLanguage : "",
        languages: movie ? movie.languages : [],
        subtitles: movie ? movie.subtitles : [],
        trailerURL: movie ? movie.trailerURL : "",
    };

    return useForm<MovieSubmit>({
        resolver: zodResolver(MovieSubmitSchema),
        defaultValues,
    });
}