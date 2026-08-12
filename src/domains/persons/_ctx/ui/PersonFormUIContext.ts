/**
 * @fileoverview React context provider and hooks for managing person form UI disclosure state.
 */

import {createDisclosureContext} from "@/common/_feat";

const {Provider, useDisclosureState, useDisclosureActions} = createDisclosureContext({
    stateName: "person-form-ui-state-context",
    setterName: "person-form-ui-setter-context",
    defaultOpenState: false,
});

export {
    /** Context provider component for managing person form UI disclosure state. */
        Provider as PersonFormUIContextProvider,
    /** Custom hook to access person form UI disclosure state from context. */
        useDisclosureState as usePersonFormUIState,
    /** Custom hook to access person form UI disclosure actions from context. */
        useDisclosureActions as usePersonFormUIActions,
}