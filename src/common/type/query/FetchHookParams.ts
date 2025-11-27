/**
 * # Fetch By Query Hook Params
 *
 * This module defines a reusable generic type for parameter objects consumed by
 * hooks that fetch data using arbitrary query option structures.
 * It combines standard request configuration, user-provided query options, and
 * React Query configuration into one strongly typed contract.
 *
 * ## Purpose
 * - Provides a type-safe pattern for any hook that fetches data based on
 *   user-defined query option types.
 * - Ensures consistent typing across API-related hook implementations.
 * - Decouples query option shape (`TOptions`) from the hook infrastructure.
 *
 * ## Includes
 * - **RequestOptions** — Base API request parameters (URL, method, etc.).
 * - **TOptions** — Caller-defined query option structure.
 * - **UseQueryOptions** — React Query configuration typed to the expected return data.
 */

import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";

/**
 * ## FetchByQueryHookParams
 *
 * Generic type representing the parameter object accepted by "fetch by query"
 * hooks.
 * It combines:
 * - request-level configuration (`RequestOptions`)
 * - caller-specified query option format (`TOptions`)
 * - typed React Query settings (`UseQueryOptions<TData>`)
 *
 * ### Fields
 * - **queries** — A caller-defined object describing the query filters/sorts/etc.
 * - **options** — React Query options for controlling the hook's behavior.
 *
 * @template TOptions
 * The shape of the query options used by the hook (e.g., filter + sort objects).
 *
 * @template TData
 * The expected return type of the hook’s query. Defaults to `unknown`.
 *
 * @example
 * type UserFilters = {
 *   role?: string;
 *   active?: boolean;
 * };
 *
 * const params: FetchByQueryHookParams<UserFilters, User[]> = {
 *   url: "/api/users",
 *   method: "GET",
 *   queries: {
 *     role: "admin",
 *     active: true
 *   },
 *   options: {
 *     enabled: true,
 *     staleTime: 10000
 *   }
 * };
 */
export type FetchByQueryHookParams<TOptions, TData = unknown> = RequestOptions & {
    queries?: TOptions;
    options?: UseQueryOptions<TData>;
};
