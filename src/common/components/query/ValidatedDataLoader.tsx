/**
 * @file High-order component for orchestrating query lifecycles with strict runtime schema validation.
 * @filename ValidatedDataLoader.tsx
 */

import {ComponentType, ReactNode} from 'react';
import PageLoader from "@/common/components/page/PageLoader.tsx";
import {UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {z, ZodTypeAny} from "zod";
import {ParseError} from "@/common/errors/ParseError.ts";

/**
 * Props for {@link ValidatedDataLoader}.
 */
type LoaderProps<
    TData = unknown,
    TSchema extends ZodTypeAny = ZodTypeAny
> = {
    /** The TanStack Query result object to monitor for status and data. */
    query: UseQueryResult<TData, HttpResponseError>;

    /** The Zod schema used to verify the integrity of the returned query data. */
    schema: TSchema;

    /** Override for the default loading indicator. @default PageLoader */
    loaderComponent?: ComponentType;
} & (| {
    /** When true, validates data against the schema before rendering. */
    isEnabled?: true;
    /** Render prop receiving the successfully parsed and typed data. */
    children: (data: z.infer<TSchema>) => ReactNode;
} | {
    /** When false, bypasses the query and validation logic. */
    isEnabled: false;
    /** Render prop receiving null. */
    children: (data: null) => ReactNode;
});

/**
 * A boundary component that synchronizes network state with data integrity checks.
 * @param `params` - The query result, Zod schema, and render logic.
 */
const ValidatedDataLoader = <TData = unknown, TSchema extends ZodTypeAny = ZodTypeAny>(
    params: LoaderProps<TData, TSchema>
) => {
    const {
        children,
        schema,
        query: {data, isPending, isFetching, isError, error},
        loaderComponent: Loader = PageLoader,
        isEnabled = true,
    } = params;

    if (!isEnabled) return (<>{children(null)}</>);
    if (isPending || (isFetching && !data)) return <Loader/>;
    if (isError) throw error;

    const {data: parsedData, error: parseError, success} = schema.safeParse(data);

    if (!success) {
        if (import.meta.env.VITE_DEV_MODE && import.meta.env.VITE_DEV_LOG_TO_CONSOLE) {
            console.group("Query Validation Failed");
            console.error("Payload: ", data);
            console.error("Zod Issues: ", parseError?.errors);
            console.groupEnd();
        }

        throw new ParseError({
            message: "The data received from the server does not match the expected schema.",
            errors: parseError.errors,
        });
    }

    return <>
        {children(parsedData)}
    </>;
};

export default ValidatedDataLoader;