import {MovieDetailsUIContextProvider} from "@/domains/movies/_ctx/details-ui/MovieDetailsUIContextProvider.tsx";
import {
    MovieDetailsUIStates,
    MovieDetailsUIStatesContext
} from "@/domains/movies/_ctx/details-ui/MovieDetailsUIStatesContext.ts";
import {
    MovieDetailsUISetters,
    MovieDetailsUISettersContext
} from "@/domains/movies/_ctx/details-ui/MovieDetailsUISettersContext.ts";

export {
    MovieDetailsUIStatesContext,
    MovieDetailsUISettersContext,
    MovieDetailsUIContextProvider,
}

export type {
    MovieDetailsUISetters,
    MovieDetailsUIStates,
}