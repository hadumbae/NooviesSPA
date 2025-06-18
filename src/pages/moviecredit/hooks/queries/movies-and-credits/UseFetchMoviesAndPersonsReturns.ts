type ValidParsedDataResults<TMovie, TPerson> = {
    data: { movies: TMovie, persons: TPerson },
    parseSuccess: true
    parseError: null,
}

type InvalidParsedDataResults = {
    data: { movies: null, persons: null };
    parseSuccess: false;
    parseError: Error | null;
}

export type UseFetchMoviesAndPersonsReturns<TMovie = any, TPerson = any> = {
    isPending: boolean,
    isError: boolean,
    queryError: Error | null,
} & (
    | ValidParsedDataResults<TMovie, TPerson>
    | InvalidParsedDataResults
);

