import {useSearchParams} from "react-router-dom";
import {ParseError} from "@/common/errors/ParseError.ts";
import updateSearchParams from "@/common/utility/params/updateSearchParams.ts";
import {MovieQuerySortSchema} from "@/pages/movies/schema/queries/MovieFilter.schema.ts";
import {MovieQuerySorts} from "@/pages/movies/schema/queries/MovieFilter.types.ts";

interface SortParamReturns {
    rawSort: Partial<Record<string, string>>
    sort: MovieQuerySorts;
    setMovieSortParams: (values: MovieQuerySorts) => void;
}

export default function useFetchMovieBrowseSortParams(): SortParamReturns {
    // Setup
    const [searchParams, setSearchParams] = useSearchParams();

    const rawSort = {
        releaseDateSort: searchParams.get("releaseDateSort") || undefined,
        titleSort: searchParams.get("titleSort") || undefined,
    }

    const sortParams = {
        sortByReleaseDate: rawSort["releaseDateSort"],
        sortByTitle: rawSort["titleSort"],
    };

    // Parsing
    const {data: sort, success, error} = MovieQuerySortSchema.safeParse(sortParams);
    if (!success) {
        throw new ParseError({
            message: "Invalid Sort Parameters In URL",
            errors: error?.issues || [],
        });
    }

    // Function
    const setMovieSortParams = (values: MovieQuerySorts) => {
        const updateValues = {releaseDateSort: values.sortByReleaseDate, titleSort: values.sortByTitle};
        const newSearchParams = updateSearchParams({searchParams, updateValues});
        setSearchParams(newSearchParams);
    }

    return {
        rawSort,
        sort: sort || {},
        setMovieSortParams,
    }
}