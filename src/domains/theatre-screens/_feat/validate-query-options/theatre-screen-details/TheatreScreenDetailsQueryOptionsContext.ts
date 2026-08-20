/**
 * @fileoverview Defines the context provider and custom hook for managing theatre screen details query options.
 */

import {createQueryOptionsContext} from "@/common/_feat";
import {
    TheatreScreenDetailsQueryOptionsSchema
} from "@/domains/theatre-screens/_feat/validate-query-options/theatre-screen-details/TheatreScreenDetailsQueryOptionsSchema.ts";

const {Provider, useQueryOptionsContext} = createQueryOptionsContext({
    schema: TheatreScreenDetailsQueryOptionsSchema,
    name: "theatre-screen-details-query-options-Context"
});

export {
    /** Context provider component for supplying theatre screen details query options state. */
        Provider as TheatreScreenDetailsQueryOptionsContextProvider,
    /** Custom hook for accessing the theatre screen details query options context state. */
        useQueryOptionsContext as useTheatreScreenDetailsQueryOptionsContext,
}