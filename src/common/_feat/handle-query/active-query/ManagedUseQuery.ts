/**
 * @fileoverview Defines the structure for a managed React Query result paired with its validation schema.
 */

import {ZodTypeAny} from "zod";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {UseQueryResult} from "@tanstack/react-query";

/** Represents a query result bundled with its activation state, cache key, and Zod validation schema. */
export type ManagedUseQuery<TSchema extends ZodTypeAny = ZodTypeAny, TData = unknown, TError = HttpResponseError> = {
    enabled: boolean;
    key: string;
    schema: TSchema;
    query: UseQueryResult<TData, TError>;
};