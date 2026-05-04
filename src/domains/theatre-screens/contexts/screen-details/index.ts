import {ScreenDetailsUIStateContext, ScreenDetailsUIStateContextValues} from "./ScreenDetailsUIStateContext.ts";
import {
    ScreenDetailsUIContextProvider
} from "@/domains/theatre-screens/contexts/screen-details/ScreenDetailsUIContextProvider.tsx";
import {
    ScreenDetailsUISetterContext,
    ScreenDetailsUISetterContextValues
} from "@/domains/theatre-screens/contexts/screen-details/ScreenDetailsUISetterContext.ts";


export {
    ScreenDetailsUIStateContext,
    ScreenDetailsUISetterContext,
    ScreenDetailsUIContextProvider,
}

export type {
    ScreenDetailsUIStateContextValues,
    ScreenDetailsUISetterContextValues,
}