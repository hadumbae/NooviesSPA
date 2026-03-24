/**
 * @file React hook for synchronizing schema-validated search parameters with the URL.
 * @filename useParsedSearchParams.ts
 */

import serializeQueryStrings from "@/common/features/fetch-search-params/serializeQueryStrings.ts";
import {useSearchParams} from "react-router-dom";
import parseSearchParams from "@/common/features/fetch-search-params/parseSearchParams.ts";
import {updateSearchParams} from "@/common/features/fetch-search-params";
import {z, ZodObject, ZodRawShape} from "zod";
import stringifySearchParamValues from "@/common/features/fetch-search-params/stringifySearchParamValues.ts";
import getTopLevelArrayKeys from "@/common/utility/features/zod/getTopLevelArrayKeys.ts";

/**
 * Configuration parameters for the {@link useParsedSearchParams} hook.
 * @template TShape - The Zod raw shape representing the query structure.
 * @template TOptions - The inferred type derived from the Zod schema.
 */
export type ParsedSearchParamHookParams<
    TShape extends ZodRawShape,
    TOptions extends Partial<z.infer<ZodObject<TShape>>> = Partial<z.infer<ZodObject<TShape>>>
> = {
    /** Initial fallback values used if parameters are missing from the URL. */
    defaultValues?: TOptions;
    /** The Zod object schema used to parse, coerce, and validate raw string parameters. */
    schema: ZodObject<TShape>;
};

/**
 * The structured return object providing access to and manipulation of search parameters.
 * @template TShape - The Zod raw shape representing the query structure.
 */
export type ParsedSearchParamHookReturns<
    TShape extends ZodRawShape,
    TOptions extends Partial<z.infer<ZodObject<TShape>>> = Partial<z.infer<ZodObject<TShape>>>
> = {
    /** The current validated and typed search parameters. */
    searchParams: z.infer<ZodObject<TShape>>;
    /** Function to update parameters while synchronizing with the browser's URL. */
    setSearchParams: (values: TOptions) => void;
};

/**
 * A robust hook that bridges React Router's `useSearchParams` with Zod validation.
 * @template TShape - The Zod raw shape definition.
 * @param params - Hook configuration including the schema and optional default values.
 * @returns An object containing the parsed parameters and a state-aware setter function.
 */
export default function useParsedSearchParams<
    TShape extends ZodRawShape,
    TOptions extends Partial<z.infer<ZodObject<TShape>>> = Partial<z.infer<ZodObject<TShape>>>
>(
    {defaultValues, schema}: ParsedSearchParamHookParams<TShape, TOptions>,
): ParsedSearchParamHookReturns<TShape, TOptions> {
    const defaultQueryStrings = serializeQueryStrings(defaultValues);
    const [searchParams, setSearchParams] = useSearchParams(defaultQueryStrings);

    const arrayFieldKeys = getTopLevelArrayKeys(schema);
    const searchParamStrings = stringifySearchParamValues({searchParams, arrayFieldKeys});
    const parsedQueries = parseSearchParams({paramStrings: searchParamStrings, schema});

    const updateQueryStrings = (values: TOptions) => {
        const updatedSearchParams = updateSearchParams({searchParams, updateData: values});
        setSearchParams(updatedSearchParams);
    };

    return {
        searchParams: parsedQueries,
        setSearchParams: updateQueryStrings,
    };
}