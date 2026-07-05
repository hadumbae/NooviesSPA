/**
 * @fileoverview Hook for synchronising, parsing, and validating URL search parameters using Zod schemas.
 */

import serializeQueryStrings from "@/common/_feat/fetch-search-params/serializeQueryStrings.ts";
import {useSearchParams} from "react-router-dom";
import parseSearchParams from "@/common/_feat/fetch-search-params/parseSearchParams.ts";
import {updateSearchParams} from "@/common/_feat/fetch-search-params/index";
import {z, ZodObject, ZodRawShape} from "zod";
import stringifySearchParamValues from "@/common/_feat/fetch-search-params/stringifySearchParamValues.ts";
import getTopLevelArrayKeys from "@/common/utility/features/zod/getTopLevelArrayKeys.ts";

/** Configuration parameters for the useParsedSearchParams hook. */
export type ParsedSearchParamHookParams<
    TShape extends ZodRawShape,
    TOptions extends Partial<z.infer<ZodObject<TShape>>> = Partial<z.infer<ZodObject<TShape>>>
> = {
    defaultValues?: TOptions;
    schema: ZodObject<TShape>;
};

/** The structured return object providing access to and manipulation of search parameters. */
export type ParsedSearchParamHookReturns<
    TShape extends ZodRawShape,
    TOptions extends Partial<z.infer<ZodObject<TShape>>> = Partial<z.infer<ZodObject<TShape>>>
> = {
    searchParams: z.infer<ZodObject<TShape>>;
    setSearchParams: (values: TOptions) => void;
};

/**
 * Manages URL search parameters by parsing them against a Zod schema and providing a typed setter.
 */
export function useParsedSearchParams<
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