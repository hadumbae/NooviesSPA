/**
 * @fileoverview Context provider and hooks for managing disclosure state during pending genre image updates.
 */

import {createDisclosureContext} from "@/common/_feat";

const {Provider, useDisclosureState, useDisclosureActions} = createDisclosureContext({
    stateName: "pending-genre-image-update-ui-state-context",
    setterName: "pending-genre-image-update-ui-setter-context",
});

export {
    /** Context provider component for pending genre image update disclosure UI state. */
        Provider as PendingGenreImageUpdateUIContextProvider,
    /** Hook for reading the pending genre image update disclosure state. */
        useDisclosureState as usePendingGenreImageUpdateUIContext,
    /** Hook for accessing actions to control the pending genre image update disclosure state. */
        useDisclosureActions as usePendingGenreImageUpdateUIContextActions,
}