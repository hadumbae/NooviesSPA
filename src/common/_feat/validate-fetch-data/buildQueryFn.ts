/**
 * @fileoverview Higher-order function for building validated TanStack Query fetch functions.
 */

import {validateData} from "@/common/_feat/validate-data/validateData.ts";
import {logZodErrors} from "@/common/_feat/validate-data/logZodErrors.ts";
import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {ZodType, ZodTypeDef} from "zod";

type HandlerConfig<TData> = {
    action: () => Promise<FetchRequestReturns<TData>>;
    schema: ZodType<TData, ZodTypeDef, unknown>;
};

/** Creates a reusable, type-safe query function with integrated Zod validation. */
export function buildQueryFn<TData>(
    {action, schema}: HandlerConfig<TData>
): () => Promise<TData> {
    return async (): Promise<TData> => {
        const {result} = await action();
        import.meta.env.VITE_LOG_FETCH_RESULT_TO_CONSOLE && console.debug("Fetch Result:", result);

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