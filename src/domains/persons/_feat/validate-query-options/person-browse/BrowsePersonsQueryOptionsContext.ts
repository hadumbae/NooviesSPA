/**
 * @fileoverview React context provider and hook for managing browse persons query options context.
 */

import {createQueryOptionsContext} from "@/common/_feat";
import {BrowsePersonsQueryOptionsSchema} from "@/domains/persons";

const {Provider, useQueryOptionsContext} = createQueryOptionsContext({
    schema: BrowsePersonsQueryOptionsSchema,
    name: "browse-persons-query-options-context",
});

export {
    /** Context provider component for managing browse persons query options state. */
        Provider as BrowsePersonsQueryOptionsContextProvider,
    /** Custom hook to access browse persons query options from context. */
        useQueryOptionsContext as useBrowsePersonsQueryOptionsContext,
}