/**
 * @fileoverview Defines disclosure context provider and hooks for managing movie poster deletion UI visibility state.
 */

import {createDisclosureContext} from "@/common/_feat";

const {Provider, useDisclosureState, useDisclosureActions} = createDisclosureContext({
    stateName: "is-deleting-movie-poster-ui-state-context",
    setterName: "is-deleting-movie-poster-ui-setter-context",
    defaultOpenState: false,
});

export {
    /** Context provider component for managing movie poster deletion UI disclosure state. */
        Provider as IsDeletingMoviePosterUIContextProvider,
    /** Custom hook for accessing the movie poster deletion UI disclosure state. */
        useDisclosureState as useIsDeletingMoviePosterUIContext,
    /** Custom hook for accessing actions to update movie poster deletion UI disclosure state. */
        useDisclosureActions as useIsDeletingMoviePosterUIActions,
}