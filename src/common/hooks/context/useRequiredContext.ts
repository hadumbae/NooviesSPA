import { Context, useContext } from "react";

/**
 * Parameters for `useRequiredContext`.
 *
 * @typeParam TContext - The type of the context value expected.
 */
type ContextParams<TContext> = {
    /** The React context to consume. */
    context: Context<TContext | undefined>;

    /** Optional custom error message if the context value is undefined. */
    message?: string;
};

/**
 * Custom hook to consume a React context and ensure it is defined.
 *
 * @remarks
 * - Throws an error if the context value is `undefined`, indicating that the
 *   component is not rendered within a matching context provider.
 * - Useful for strongly-typed contexts where a default value is not provided.
 *
 * @typeParam TContext - The type of the context value.
 *
 * @param params - Object containing:
 *   - `context`: The React context to consume.
 *   - `message` (optional): Custom error message if context is missing.
 *
 * @returns The context value of type `TContext`.
 *
 * @throws Will throw an error if the context is undefined.
 *
 * @example
 * ```ts
 * const MyContext = React.createContext<MyType | undefined>(undefined);
 *
 * function MyComponent() {
 *   const context = useRequiredContext({ context: MyContext });
 *   // context is guaranteed to be defined here
 * }
 * ```
 */
export default function useRequiredContext<TContext>(
    params: ContextParams<TContext>
): TContext {
    const { context, message } = params;
    const ctx = useContext(context);

    if (ctx === undefined) {
        throw new Error(message ?? "Context must be used within provider.");
    }

    return ctx;
}
