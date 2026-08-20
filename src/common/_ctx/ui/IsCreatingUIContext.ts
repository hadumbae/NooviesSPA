/**
 * @fileoverview Defines disclosure context provider and hooks for managing creation UI visibility state.
 */

import {createDisclosureContext} from "@/common/_feat";

const {Provider, useDisclosureState, useDisclosureActions} = createDisclosureContext({
    stateName: "is-creating-ui-state-context",
    setterName: "is-creating-ui-setter-context",
    defaultOpenState: false,
});

export {
    /** Context provider component for managing general creation UI disclosure state. */
        Provider as IsCreatingUIContextProvider,
    /** Custom hook for accessing the general creation UI disclosure state. */
        useDisclosureState as useIsCreatingUIContext,
    /** Custom hook for accessing actions to update general creation UI disclosure state. */
        useDisclosureActions as useIsCreatingUIContextActions,
}