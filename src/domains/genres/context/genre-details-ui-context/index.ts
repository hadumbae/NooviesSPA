import {GenreDetailsUIStateContext, GenreDetailsUIStateContextValues} from "./GenreDetailsUIStateContext.ts";
import {
    GenreDetailsUIContextProvider
} from "@/domains/genres/context/genre-details-ui-context/GenreDetailsUIContextProvider.tsx";
import {
    GenreDetailsUISetterContext,
    GenreDetailsUISetterContextValues
} from "@/domains/genres/context/genre-details-ui-context/GenreDetailsUISetterContext.ts";
import {
    GenreDetailsUIPendingStateContext,
    GenreDetailsUIPendingStateContextValues
} from "@/domains/genres/context/genre-details-ui-context/GenreDetailsUIPendingStateContext.ts";
import {
    GenreDetailsUIPendingSetterContext,
    GenreDetailsUIPendingSetterContextValues
} from "@/domains/genres/context/genre-details-ui-context/GenreDetailsUIPendingSetterContext.ts";
import {
    GenreDetailsUIPendingContextProvider
} from "@/domains/genres/context/genre-details-ui-context/GenreDetailsUIPendingContextProvider.tsx";

export {
    GenreDetailsUIContextProvider,
    GenreDetailsUIPendingContextProvider,
}

export {
    GenreDetailsUIStateContext,
    GenreDetailsUISetterContext,
    GenreDetailsUIPendingStateContext,
    GenreDetailsUIPendingSetterContext,
}

export type {
    GenreDetailsUIStateContextValues,
    GenreDetailsUISetterContextValues,
    GenreDetailsUIPendingStateContextValues,
    GenreDetailsUIPendingSetterContextValues,
}