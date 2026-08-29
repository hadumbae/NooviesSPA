/**
 * @fileoverview Context provider and hooks for managing disclosure state during pending genre image deletion operations.
 */

import {createDisclosureContext} from "@/common/_feat";

const {Provider, useDisclosureState, useDisclosureActions} = createDisclosureContext({
    stateName: "pending-genre-image-delete-ui-state-context",
    setterName: "pending-genre-image-delete-ui-setter-context",
});

export {
    /** Context provider component for pending genre image deletion disclosure UI state. */
        Provider as PendingGenreImageDeleteUIContextProvider,
    /** Hook for reading the pending genre image deletion disclosure state. */
        useDisclosureState as usePendingGenreImageDeleteUIContext,
    /** Hook for accessing actions to control the pending genre image deletion disclosure state. */
        useDisclosureActions as usePendingGenreImageDeleteUIContextActions,
}