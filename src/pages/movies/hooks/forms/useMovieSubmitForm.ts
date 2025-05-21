import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {MovieSubmit, MovieSubmitSchema} from "@/pages/movies/schema/form/MovieSubmitSchema.ts";
import {Movie} from "@/pages/movies/schema/model/MovieSchema.ts";
import convertObjectsToIDs from "@/common/utility/convertObjectsToIDs.ts";

export default function useMovieSubmitForm(params?: {movie?: Movie}) {
    const {movie} = params || {};

    const defaultValues: MovieSubmit = {
        title: "",
        originalTitle: "",
        tagline: "",
        country: "",
        synopsis: "",
        genres: [],
        releaseDate: "",
        runtime: "",
        originalLanguage: "",
        languages: [],
        subtitles: [],
        trailerURL: "",
    }

    let genres = movie?.genres.map(convertObjectsToIDs) || defaultValues.genres;

    return useForm<MovieSubmit>({
        resolver: zodResolver(MovieSubmitSchema),
        defaultValues: {
            ...defaultValues,
            ...(movie ? movie : {}),
            genres,
        },
    });
}