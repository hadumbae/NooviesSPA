/**
 * @fileoverview Filters and extracts active query results and validation schemas from a list of managed queries.
 */

import {ManagedUseQuery} from "@/common/_feat/handle-query/active-query/ManagedUseQuery.ts";
import {ZodTypeAny} from "zod";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {UseQueryResult} from "@tanstack/react-query";

/** Result object containing filtered query instances and their associated validation metadata. */
type ActiveUseQueryReturns<TSchema extends ZodTypeAny = ZodTypeAny, TData = unknown, TError = HttpResponseError> = {
    queries: UseQueryResult<TData, TError>[];
    validationQueries: {
        key: string;
        query: UseQueryResult<TData, TError>;
        schema: TSchema;
    }[];
};

/** Filters a collection of managed queries to return only those that are currently enabled. */
export function activeUseQueriesOnly<TSchema extends ZodTypeAny = ZodTypeAny, TData = unknown, TError = HttpResponseError>(
    queries: ManagedUseQuery<TSchema, TData, TError>[]
): ActiveUseQueryReturns<TSchema, TData, TError> {
    const activeManagedQueries = queries.filter(q => q.enabled);

    const activeQueries = activeManagedQueries.map(q => q.query);
    const activeValidationQueries = activeManagedQueries.map(({key, query, schema}) => ({key, query, schema}));

    return {
        queries: activeQueries,
        validationQueries: activeValidationQueries
    };
}
