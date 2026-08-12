/**
 * @fileoverview Utility function for scheduling asynchronous UI selection state updates.
 */

import {Dispatch, SetStateAction} from "react";

/**
 * Defers setting a boolean UI selection state to true on the next event loop tick.
 */
export function onUISelect(func: Dispatch<SetStateAction<boolean>>) {
    return () => setTimeout(() => func(true), 0);
}