/**
 * @fileoverview Configuration type for navigation link items.
 */

import {LogContext} from "@/common/_feat/logger/Logger.types.ts";

/** Configuration for a single navigation link and its logging metadata. */
export type LinkItemConfig = {
    to: string;
    label: string;
    context?: LogContext;
    message?: string;
};
