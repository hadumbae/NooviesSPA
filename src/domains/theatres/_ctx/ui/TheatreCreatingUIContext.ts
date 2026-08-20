/**
 * @fileoverview Defines disclosure context provider and hooks for managing theatre creation UI visibility state.
 */

import {createDisclosureContext} from "@/common/_feat";

const {Provider, useDisclosureState, useDisclosureActions} = createDisclosureContext({
    stateName: "theatre-creating-ui-state-context",
    setterName: "theatre-creating-ui-setter-context",
    defaultOpenState: false,
});

export {
    /** Context provider component for managing theatre creation UI disclosure state. */
        Provider as TheatreCreatingUIContextProvider,
    /** Custom hook for accessing the theatre creation UI disclosure state. */
        useDisclosureState as useTheatreCreatingUIContext,
    /** Custom hook for accessing actions to update theatre creation UI disclosure state. */
        useDisclosureActions as useTheatreCreatingUIContextActions,
}