/**
 * @fileoverview React context provider and hooks for managing person deleting UI disclosure state.
 */

import {createDisclosureContext} from "@/common/_feat";

const {Provider, useDisclosureState, useDisclosureActions} = createDisclosureContext({
    stateName: "person-deleting-ui-state-context",
    setterName: "person-deleting-ui-setter-context",
    defaultOpenState: false,
});

export {
    /** Context provider component for managing person deleting UI disclosure state. */
        Provider as PersonDeletingUIContextProvider,
    /** Custom hook to access person deleting UI disclosure state from context. */
        useDisclosureState as usePersonDeletingUIState,
    /** Custom hook to access person deleting UI disclosure actions from context. */
        useDisclosureActions as usePersonDeletingUIActions,
}