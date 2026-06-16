/**
 * @fileoverview Utility for handling common side effects during mutation submissions.
 */

import {toast} from "react-toastify";
import {MutationHandlerConfig} from "@/common/_feat/handle-mutation-callback/MutationHandlerConfig.ts";


/** Triggers an optional toast notification and executes a callback function. */
export function handleMutationCallback(
    {message, messageType, cb}: MutationHandlerConfig = {}
): void {
    message && toast[messageType || "info"](message);
    cb?.();
}