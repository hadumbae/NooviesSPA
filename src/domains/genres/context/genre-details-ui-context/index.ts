import {
    GenreDetailsUIStateContext, GenreDetailsUIStateContextValues
} from "@/domains/genres/context/genre-details-ui-context/GenreDetailsUIStateContext.ts";
import {
    GenreDetailsUIContextProvider
} from "@/domains/genres/context/genre-details-ui-context/GenreDetailsUIContextProvider.tsx";
import {
    GenreDetailsUISetterContext,
    GenreDetailsUISetterContextValues
} from "@/domains/genres/context/genre-details-ui-context/GenreDetailsUISetterContext.ts";
import {
    GenreDetailsUIPendingContextProvider
} from "@/domains/genres/context/genre-details-ui-pending-context/GenreDetailsUIPendingContextProvider.tsx";

export {
    GenreDetailsUIContextProvider,
    GenreDetailsUIPendingContextProvider,
}

export {
    GenreDetailsUIStateContext,
    GenreDetailsUISetterContext,
}

export type {
    GenreDetailsUIStateContextValues,
    GenreDetailsUISetterContextValues,
}