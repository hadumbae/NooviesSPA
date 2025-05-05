import {useSearchParams} from "react-router-dom";
import {MovieQueryParamSchema} from "@/pages/movies/schema/queries/MovieQueryParamSchema.ts";
import {Genre} from "@/pages/genres/schema/GenreSchema.ts";
import {ParseError} from "@/common/errors/ParseError.ts";
import updateSearchParams from "@/common/utility/params/updateSearchParams.ts";

export default function useFetchMovieBrowseQueryParams({genres}: { genres: Genre[] }) {
    // Setup
    const [searchParams, setSearchParams] = useSearchParams();
    const genre = genres.find(g => g.name === searchParams.get("genreFilter")) ?? null;

    const rawQuery = {
        titleFilter: searchParams.get("titleFilter") || undefined,
        releaseDateFilter: searchParams.get("releaseDateFilter") || undefined,
        genreFilter: genre ? searchParams.get("genreFilter") : undefined,
    }

    const queryParams = {
        title: rawQuery["titleFilter"],
        releaseDate: rawQuery["releaseDateFilter"],
        ...(genre ? {genres: [genre._id]} : {}),
    };

    // Parsing
    const {data: query, success, error} = MovieQueryParamSchema.safeParse(queryParams);
    if (!success) {
        throw new ParseError({message: "Invalid Query Parameters In URL", errors: error?.issues || []});
    }

    // Function
    const setMovieQueryParams = (values: { genre?: Genre, title?: string, releaseDate?: string }) => {
        const updateValues = {
            titleFilter: values.title,
            releaseDateFilter: values.releaseDate,
            genreFilter: values.genre?.name || undefined,
        };

        const newSearchParams = updateSearchParams({searchParams, updateValues});
        setSearchParams(newSearchParams);
    }

    return {
        query: query || {},
        rawQuery,
        setMovieQueryParams,
    }
}