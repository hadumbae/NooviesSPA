/**
 * @fileoverview Defines disclosure context provider and hooks for managing theatre screen editing UI visibility state.
 */

import {createDisclosureContext} from "@/common/_feat";

const {Provider, useDisclosureState, useDisclosureActions} = createDisclosureContext({
    stateName: "theatre-screen-editing-ui-state-context",
    setterName: "theatre-screen-editing-ui-setter-context",
    defaultOpenState: false,
});

export {
    /** Context provider component for managing theatre screen editing UI disclosure state. */
        Provider as TheatreScreenEditingUIContextProvider,
    /** Custom hook for accessing the theatre screen editing UI disclosure state. */
        useDisclosureState as useTheatreScreenEditingUIContext,
    /** Custom hook for accessing actions to update theatre screen editing UI disclosure state. */
        useDisclosureActions as useTheatreScreenEditingUIContextActions,
}