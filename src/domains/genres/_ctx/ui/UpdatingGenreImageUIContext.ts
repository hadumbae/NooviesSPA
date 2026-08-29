/**
 * @fileoverview Context provider and hooks for managing disclosure state during genre image update operations.
 */

import {createDisclosureContext} from "@/common/_feat";

const {Provider, useDisclosureState, useDisclosureActions} = createDisclosureContext({
    stateName: "updating-genre-image-ui-state-context",
    setterName: "updating-genre-image-ui-setter-context",
});

export {
    /** Context provider component for updating genre image disclosure UI state. */
        Provider as UpdatingGenreImageUIContextProvider,
    /** Hook for reading the updating genre image disclosure state. */
        useDisclosureState as useUpdatingGenreImageUIContext,
    /** Hook for accessing actions to control the updating genre image disclosure state. */
        useDisclosureActions as useUpdatingGenreImageUIContextActions,
}