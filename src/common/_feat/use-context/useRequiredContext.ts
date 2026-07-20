/**
 * @fileoverview Utility hook for consuming React context with mandatory provider validation.
 */

import { Context, useContext } from "react";

/** Configuration parameters for the useRequiredContext hook. */
type ContextParams<TContext> = {
    context: Context<TContext | undefined>;
    message?: string;
};

/**
 * Consumes a context and throws a runtime error if the value is undefined.
 */
export function useRequiredContext<TContext>(
    params: ContextParams<TContext>
): TContext {
    const {context, message} = params;
    const ctx = useContext(context);

    if (ctx === undefined) {
        const defaultMessage = context.displayName
            ? `Context must be used within a provider for "${context.displayName}".`
            : "Context must be used within provider.";

        throw new Error(message ?? defaultMessage);
    }

    return ctx;
}
