/**
 * @fileoverview Disclosure context provider and hooks for managing movie banner deletion UI state.
 */

import {createDisclosureContext} from "@/common/_feat";

const {Provider, useDisclosureState, useDisclosureActions} = createDisclosureContext({
    stateName: "is-deleting-movie-banner-ui-state-context",
    setterName: "is-deleting-movie-banner-ui-setter-context",
    defaultOpenState: false,
});

export {
    /** Context provider for managing the open/close disclosure state of movie banner deletion UI elements. */
        Provider as IsDeletingMovieBannerUIContextProvider,
    /** Custom hook for accessing the movie banner deletion disclosure state. */
        useDisclosureState as useIsDeletingMovieBannerUIContext,
    /** Custom hook for accessing the movie banner deletion disclosure actions. */
        useDisclosureActions as useIsDeletingMovieBannerUIActions,
}