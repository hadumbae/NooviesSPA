/**
 * @file LinkConfig.ts
 * @description
 * Configuration object for defining navigational links with optional logging metadata.
 */

import {LogContext} from "@/common/utility/features/logger/Logger.types.ts";

/**
 * Defines the configuration for a navigational link.
 */
export type LinkConfig = {
    /**
     * Target navigation path or URL.
     */
    to: string;

    /**
     * Human-readable label for the link.
     */
    label: string;

    /**
     * Optional logging context associated with the link.
     */
    context?: LogContext;

    /**
     * Optional log message emitted when the link is used.
     */
    message?: string;
};
