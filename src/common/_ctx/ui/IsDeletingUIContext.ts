/**
 * @fileoverview Defines disclosure context provider and hooks for managing deletion UI visibility state.
 */

import {createDisclosureContext} from "@/common/_feat";

const {Provider, useDisclosureState, useDisclosureActions} = createDisclosureContext({
    stateName: "is-deleting-ui-state-context",
    setterName: "is-deleting-ui-setter-context",
    defaultOpenState: false,
});

export {
    /** Context provider component for managing general deletion UI disclosure state. */
        Provider as IsDeletingUIContextProvider,
    /** Custom hook for accessing the general deletion UI disclosure state. */
        useDisclosureState as useIsDeletingUIContext,
    /** Custom hook for accessing actions to update general deletion UI disclosure state. */
        useDisclosureActions as useIsDeletingUIContextActions,
}