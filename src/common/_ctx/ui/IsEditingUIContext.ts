/**
 * @fileoverview Defines disclosure context provider and hooks for managing editing UI visibility state.
 */

import {createDisclosureContext} from "@/common/_feat";

const {Provider, useDisclosureState, useDisclosureActions} = createDisclosureContext({
    stateName: "is-editing-ui-state-context",
    setterName: "is-editing-ui-setter-context",
    defaultOpenState: false,
});

export {
/** Context provider component for managing general editing UI disclosure state. */
    Provider as IsEditingUIContextProvider,
/** Custom hook for accessing the general editing UI disclosure state. */
    useDisclosureState as useIsEditingUIContext,
/** Custom hook for accessing actions to update general editing UI disclosure state. */
    useDisclosureActions as useIsEditingUIContextActions,
}