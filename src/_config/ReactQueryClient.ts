/**
 * @fileoverview Configures and exports the TanStack Query client for global state management.
 */

import {QueryCache, QueryClient} from "@tanstack/react-query";

/** The centralised client instance used to manage caching and server state. */
export const queryClient = new QueryClient({
    queryCache: new QueryCache(),
});
