/**
 * @fileoverview Context provider and hook for managing movie index query options state.
 */

import {createQueryOptionsContext} from "@/common/_feat";
import {
    MovieIndexQueryOptionsSchema
} from "@/domains/movies/_feat/handle-query-options/movie-index/MovieIndexQueryOptionsSchema.ts";

const {Provider, useQueryOptionsContext} = createQueryOptionsContext({
    name: "movie-index-query-options-form",
    schema: MovieIndexQueryOptionsSchema,
});

export {
/** Context provider component for movie index query options state. */
    Provider as MovieIndexQueryOptionsContextProvider,
/** Hook for accessing the movie index query options context. */
    useQueryOptionsContext as useMovieIndexQueryOptionsContext,
}