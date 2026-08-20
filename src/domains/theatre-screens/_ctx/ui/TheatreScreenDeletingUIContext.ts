/**
 * @fileoverview Defines disclosure context provider and hooks for managing theatre screen deleting UI visibility state.
 */

import {createDisclosureContext} from "@/common/_feat";

const {Provider, useDisclosureState, useDisclosureActions} = createDisclosureContext({
    stateName: "theatre-screen-deleting-ui-state-context",
    setterName: "theatre-screen-deleting-ui-setter-context",
    defaultOpenState: false,
});

export {
    /** Context provider component for managing theatre screen deleting UI disclosure state. */
        Provider as TheatreScreenDeletingUIContextProvider,
    /** Custom hook for accessing the theatre screen deleting UI disclosure state. */
        useDisclosureState as useTheatreScreenDeletingUIContext,
    /** Custom hook for accessing actions to update theatre screen deleting UI disclosure state. */
        useDisclosureActions as useTheatreScreenDeletingUIContextActions,
}