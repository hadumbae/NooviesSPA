/**
 * @fileoverview Factory for creating type-safe React context and providers for search parameter state management.
 */

import {z, ZodObject, ZodRawShape} from "zod";
import {createContext, ReactElement, ReactNode, useContext} from "react";
import {countActiveQueryOptions, useParsedSearchParams} from "@/common/_feat";
import {InvalidContextError} from "@/common/_err";

/** Configuration for the query options context factory. */
type ContextConfig<TShape extends ZodRawShape> = {
    name: string;
    schema: ZodObject<TShape>;
}

/** Values and setters provided by the query options context. */
export type QueryOptionsContextValues<TValues = unknown> = {
    values: TValues;
    setValues: (values: TValues) => void;
    activeOptions: number;
}

/** Props for the query options Provider component. */
type ProviderConfig = {
    children: ReactNode;
}

/** The provider component and hook returned by the factory. */
type FactoryReturns<TValues = unknown> = {
    Provider: (config: ProviderConfig) => ReactElement;
    useQueryOptionsContext: () => QueryOptionsContextValues<TValues>;
}

/**
 * Creates a specialised context and hook for managing search parameters validated against a Zod schema.
 */
export function createQueryOptionsContext<TShape extends ZodRawShape>(
    {name, schema}: ContextConfig<TShape>
): FactoryReturns<z.infer<ZodObject<TShape>>> {
    type CtxValues = QueryOptionsContextValues<z.infer<typeof schema>>;
    const Context = createContext<CtxValues | null>(null);

    Context.displayName = name;

    function Provider({children}: ProviderConfig): ReactElement {
        const {searchParams, setSearchParams} = useParsedSearchParams({schema});

        const values: CtxValues = {
            values: searchParams,
            setValues: setSearchParams,
            activeOptions: countActiveQueryOptions(searchParams),
        };

        return (<Context.Provider value={values}>{children}</Context.Provider>);
    }

    function useQueryOptionsContext(): CtxValues {
        const ctx = useContext(Context);

        if (!ctx) {
            throw new InvalidContextError({
                code: "required_provider",
                contextName: Context.displayName,
                message: `Must be used within provider for "${Context.displayName}" context."`
            });
        }

        return ctx;
    }

    return {
        Provider,
        useQueryOptionsContext,
    };
}
