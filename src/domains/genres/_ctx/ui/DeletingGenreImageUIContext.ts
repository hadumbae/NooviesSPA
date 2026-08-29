/**
 * @fileoverview Context provider and hooks for managing disclosure state during genre image deletion operations.
 */

import {createDisclosureContext} from "@/common/_feat";

const {Provider, useDisclosureState, useDisclosureActions} = createDisclosureContext({
    stateName: "deleting-genre-image-ui-state-context",
    setterName: "deleting-genre-image-ui-setter-context",
});

export {
    /** Context provider component for deleting genre image disclosure UI state. */
        Provider as DeletingGenreImageUIContextProvider,
    /** Hook for reading the deleting genre image disclosure state. */
        useDisclosureState as useDeletingGenreImageUIContext,
    /** Hook for accessing actions to control the deleting genre image disclosure state. */
        useDisclosureActions as useDeletingGenreImageUIContextActions,
}