/**
 * @fileoverview Defines disclosure context provider and hooks for managing theatre screen creation UI visibility state.
 */

import {createDisclosureContext} from "@/common/_feat";

const {Provider, useDisclosureState, useDisclosureActions} = createDisclosureContext({
    stateName: "theatre-screen-creating-ui-state-context",
    setterName: "theatre-screen-creating-ui-setter-context",
    defaultOpenState: false,
});

export {
    /** Context provider component for managing theatre screen creation UI disclosure state. */
        Provider as TheatreScreenCreatingUIContextProvider,
    /** Custom hook for accessing the theatre screen creation UI disclosure state. */
        useDisclosureState as useTheatreScreenCreatingUIContext,
    /** Custom hook for accessing actions to update theatre screen creation UI disclosure state. */
        useDisclosureActions as useTheatreScreenCreatingUIContextActions,
}