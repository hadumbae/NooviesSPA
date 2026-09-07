/**
 * @fileoverview Disclosure context provider and hooks for managing movie banner update UI state.
 */

import {createDisclosureContext} from "@/common/_feat";

const {Provider, useDisclosureState, useDisclosureActions} = createDisclosureContext({
    stateName: "is-updating-movie-banner-ui-state-context",
    setterName: "is-updating-movie-banner-ui-setter-context",
    defaultOpenState: false,
});


export {
    /** Context provider for managing the open/close disclosure state of movie banner update UI elements. */
        Provider as IsUpdatingMovieBannerUIContextProvider,
    /** Custom hook for accessing the movie banner update disclosure state. */
        useDisclosureState as useIsUpdatingMovieBannerUIContext,
    /** Custom hook for accessing the movie banner update disclosure actions. */
        useDisclosureActions as useIsUpdatingMovieBannerUIActions,
}