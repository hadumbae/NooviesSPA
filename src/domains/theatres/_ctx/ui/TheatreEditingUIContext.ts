/**
 * @fileoverview Defines disclosure context provider and hooks for managing theatre editing UI visibility state.
 */

import {createDisclosureContext} from "@/common/_feat";

const {Provider, useDisclosureState, useDisclosureActions} = createDisclosureContext({
    stateName: "theatre-editing-ui-state-context",
    setterName: "theatre-editing-ui-setter-context",
    defaultOpenState: false,
});

export {
    /** Context provider component for managing theatre editing UI disclosure state. */
        Provider as TheatreEditingUIContextProvider,
    /** Custom hook for accessing the theatre editing UI disclosure state. */
        useDisclosureState as useTheatreEditingUIContext,
    /** Custom hook for accessing actions to update theatre editing UI disclosure state. */
        useDisclosureActions as useTheatreEditingUIContextActions,
}