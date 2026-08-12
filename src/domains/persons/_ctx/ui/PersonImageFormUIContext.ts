/**
 * @fileoverview React context provider and hooks for managing person image form UI disclosure state.
 */

import {createDisclosureContext} from "@/common/_feat";

const {Provider, useDisclosureState, useDisclosureActions} = createDisclosureContext({
    stateName: "person-image-form-ui-state-context",
    setterName: "person-image-form-ui-setter-context",
    defaultOpenState: false,
});

export {
    /** Context provider component for managing person image form UI disclosure state. */
        Provider as PersonImageFormUIContextProvider,
    /** Custom hook to access person image form UI disclosure state from context. */
        useDisclosureState as usePersonImageFormUIState,
    /** Custom hook to access person image form UI disclosure actions from context. */
        useDisclosureActions as usePersonImageFormUIActions,
}