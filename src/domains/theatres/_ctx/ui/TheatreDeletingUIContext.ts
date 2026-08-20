/**
 * @fileoverview Defines disclosure context provider and hooks for managing theatre deleting UI visibility state.
 */

import {createDisclosureContext} from "@/common/_feat";

const {Provider, useDisclosureState, useDisclosureActions} = createDisclosureContext({
    stateName: "theatre-deleting-ui-state-context",
    setterName: "theatre-deleting-ui-setter-context",
    defaultOpenState: false,
});

export {
    /** Context provider component for managing theatre deleting UI disclosure state. */
        Provider as TheatreDeletingUIContextProvider,
    /** Custom hook for accessing the theatre deleting UI disclosure state. */
        useDisclosureState as useTheatreDeletingUIContext,
    /** Custom hook for accessing actions to update theatre deleting UI disclosure state. */
        useDisclosureActions as useTheatreDeletingUIContextActions,
}