/**
 * @fileoverview Context provider and hook exports for managing theatre info query options state.
 */

import {createQueryOptionsContext} from "@/common/_feat";
import {
    TheatreInfoQueryOptionsSchema
} from "@/domains/theatres/_feat/handle-query-options/theatre-info/TheatreInfoQueryOptionsSchema.ts";

const {Provider, useQueryOptionsContext} = createQueryOptionsContext({
    schema: TheatreInfoQueryOptionsSchema,
    name: "theatre-info-query-options-context",
});

export {
    /** Context provider component for theatre info query options state. */
        Provider as TheatreInfoQueryOptionsContextProvider,
    /** Hook for consuming the theatre info query options context. */
        useQueryOptionsContext as useTheatreInfoQueryOptionsContext,
}