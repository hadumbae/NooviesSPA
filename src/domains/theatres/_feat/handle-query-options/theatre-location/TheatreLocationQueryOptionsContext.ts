/**
 * @fileoverview Context provider and hook for managing theatre location query options state.
 */

import {createQueryOptionsContext} from "@/common/_feat";
import {
    TheatreLocationQueryOptionsSchema
} from "@/domains/theatres/_feat/handle-query-options/theatre-location/TheatreLocationQueryOptionsSchema.ts";

const {Provider, useQueryOptionsContext} = createQueryOptionsContext({
    name: "theatre-location-query-options-context",
    schema: TheatreLocationQueryOptionsSchema,
});

export {
    /** Context provider component for theatre location query options state. */
        Provider as TheatreLocationQueryOptionsContextProvider,
    /** Hook for consuming the theatre location query options context. */
        useQueryOptionsContext as useTheatreLocationQueryOptionsContext,
}