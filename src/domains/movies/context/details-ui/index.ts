import {MovieDetailsUIContextProvider} from "@/domains/movies/context/details-ui/MovieDetailsUIContextProvider.tsx";
import {
    MovieDetailsUIStates,
    MovieDetailsUIStatesContext
} from "@/domains/movies/context/details-ui/MovieDetailsUIStatesContext.ts";
import {
    MovieDetailsUISetters,
    MovieDetailsUISettersContext
} from "@/domains/movies/context/details-ui/MovieDetailsUISettersContext.ts";

export {
    MovieDetailsUIStatesContext,
    MovieDetailsUISettersContext,
    MovieDetailsUIContextProvider,
}

export type {
    MovieDetailsUISetters,
    MovieDetailsUIStates,
}