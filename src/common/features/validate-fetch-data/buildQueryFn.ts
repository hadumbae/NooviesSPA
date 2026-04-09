/**
 * @file Higher-order function for building validated TanStack Query fetch functions.
 * @filename buildQueryFn.ts
 */

import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {logZodErrors} from "@/common/hooks/validation/validate-data/logZodErrors.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {ZodType, ZodTypeDef} from "zod";

/**
 * Configuration for the Query Function builder.
 * @template TData - The expected shape of the validated data.
 */
type HandlerConfig<TData> = {
    /** The asynchronous repository action that performs the network request. */
    action: () => Promise<RequestReturns<TData>>;
    /** The Zod schema used to enforce the data contract at runtime. */
    schema: ZodType<TData, ZodTypeDef, unknown>;
};

/**
 * Creates a reusable, type-safe query function with integrated Zod validation.
 * ---
 */
export function buildQueryFn<TData>(
    {action, schema}: HandlerConfig<TData>
): () => Promise<TData> {
    return async (): Promise<TData> => {
        const {result} = await action();

        const {data, success, error} = validateData({
            data: result,
            schema,
        });

        if (!success) {
            logZodErrors({raw: result, errors: error.errors});
            throw error;
        }

        return data;
    };
}