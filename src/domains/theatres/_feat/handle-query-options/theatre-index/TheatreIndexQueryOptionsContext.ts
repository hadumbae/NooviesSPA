/**
 * @fileoverview React context provider and hook for managing theatre index query options state.
 */

import {createQueryOptionsContext} from "@/common/_feat";
import {
    TheatreIndexQueryOptionsSchema
} from "@/domains/theatres/_feat/handle-query-options/theatre-index/TheatreIndexQueryOptionsSchema.ts";

const {Provider, useQueryOptionsContext} = createQueryOptionsContext({
    name: "theatre-index-query-options-context",
    schema: TheatreIndexQueryOptionsSchema,
});

export {
    /** Context provider component for managing theatre index query options state. */
        Provider as TheatreIndexQueryOptionsContextProvider,
    /** Custom hook to access theatre index query options from context. */
        useQueryOptionsContext as useTheatreIndexQueryOptionsContext,
}