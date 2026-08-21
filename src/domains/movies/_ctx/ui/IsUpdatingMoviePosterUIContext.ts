/**
 * @fileoverview Defines disclosure context provider and hooks for managing movie poster update UI visibility state.
 */

import {createDisclosureContext} from "@/common/_feat";

const {Provider, useDisclosureState, useDisclosureActions} = createDisclosureContext({
    stateName: "is-updating-movie-poster-ui-state-context",
    setterName: "is-updating-movie-poster-ui-setter-context",
    defaultOpenState: false,
});

export {
    /** Context provider component for managing movie poster update UI disclosure state. */
        Provider as IsUpdatingMoviePosterUIContextProvider,
    /** Custom hook for accessing the movie poster update UI disclosure state. */
        useDisclosureState as useIsUpdatingMoviePosterUIContext,
    /** Custom hook for accessing actions to update movie poster update UI disclosure state. */
        useDisclosureActions as useIsUpdatingMoviePosterUIActions,
}