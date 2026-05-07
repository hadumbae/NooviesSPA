import {GenreDetailsUIStateContext, GenreDetailsUIStateContextValues} from "./GenreDetailsUIStateContext.ts";
import {
    GenreDetailsUIContextProvider
} from "@/domains/genres/context/genre-details-ui-context/GenreDetailsUIContextProvider.tsx";
import {
    GenreDetailsUISetterContext,
    GenreDetailsUISetterContextValues
} from "@/domains/genres/context/genre-details-ui-context/GenreDetailsUISetterContext.ts";


export {
    GenreDetailsUIContextProvider,
    GenreDetailsUIStateContext,
    GenreDetailsUISetterContext,
}

export type {
    GenreDetailsUIStateContextValues,
    GenreDetailsUISetterContextValues,
}