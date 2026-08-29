/**
 * @fileoverview Context provider and hook exports for managing search and filter options on the genre index view.
 */

import {createQueryOptionsContext} from "@/common/_feat";
import {GenreIndexQueryOptionsSchema} from "@/domains/genres/_feat/handle-query-options/genre-index/GenreIndexQueryOptionsSchema.ts";

const {Provider, useQueryOptionsContext} = createQueryOptionsContext({
    name: "genre-index-query-options-context",
    schema: GenreIndexQueryOptionsSchema,
});

export {
    /** Context provider component for genre index query options state. */
        Provider as GenreIndexQueryOptionsContextProvider,
    /** Hook for consuming the genre index query options context. */
        useQueryOptionsContext as useGenreIndexQueryOptionsContext,
}