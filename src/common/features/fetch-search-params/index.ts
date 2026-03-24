import useParsedSearchParams, {
    ParsedSearchParamHookParams, ParsedSearchParamHookReturns
} from "@/common/features/fetch-search-params/useParsedSearchParams.ts";
import parseSearchParams from "@/common/features/fetch-search-params/parseSearchParams.ts";
import stringifySearchParamValues from "@/common/features/fetch-search-params/stringifySearchParamValues.ts";
import serializeQueryStrings from "@/common/features/fetch-search-params/serializeQueryStrings.ts";
import {updateSearchParams} from "@/common/features/fetch-search-params";
import updateSearchParamValue from "@/common/features/fetch-search-params/updateSearchParamValue.ts";

export {
    serializeQueryStrings,
    parseSearchParams,
    stringifySearchParamValues,
    useParsedSearchParams,
    updateSearchParams,
    updateSearchParamValue,
}

export type {
    ParsedSearchParamHookParams,
    ParsedSearchParamHookReturns,
}