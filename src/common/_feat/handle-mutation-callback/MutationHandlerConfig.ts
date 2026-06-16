/**
 * @fileoverview Configuration structure for handling mutation lifecycle callbacks.
 */

/** Configuration options for mutation success and error handling. */
export type MutationHandlerConfig = {
    message?: string;
    messageType?: "success" | "info" | "error";
    cb?: () => void;
};