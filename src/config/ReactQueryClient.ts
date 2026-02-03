/**
 * @file ReactQueryClient.ts
 *
 * Centralized React Query client configuration.
 *
 * Provides a singleton `QueryClient` instance used across the application
 * to manage query caching, lifecycle, and error propagation.
 *
 * This client is intentionally minimal and relies on:
 * - per-query configuration
 * - error boundaries for failure handling
 *
 * Extend here if global defaults (retry, cache time, logging) are required.
 */

import {QueryCache, QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient({
    queryCache: new QueryCache(),
});

export default queryClient;
