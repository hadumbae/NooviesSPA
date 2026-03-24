import useParsedSearchParams, {
    ParsedSearchParamHookParams, ParsedSearchParamHookReturns
} from "@/common/features/fetch-search-params/useParsedSearchParams.ts";
import parseSearchParams from "@/common/features/fetch-search-params/parseSearchParams.ts";
import stringifySearchParamValues from "@/common/features/fetch-search-params/stringifySearchParamValues.ts";
import serializeQueryStrings from "@/common/features/fetch-search-params/serializeQueryStrings.ts";
import updateSearchParamValue from "@/common/features/fetch-search-params/updateSearchParamValue.ts";
import updateSearchParams from "@/common/features/fetch-search-params/updateSearchParams.ts";


export {
    serializeQueryStrings,
    parseSearchParams,
    stringifySearchParamValues,
    updateSearchParams,
    useParsedSearchParams,
    updateSearchParamValue,
}

export type {
    ParsedSearchParamHookParams,
    ParsedSearchParamHookReturns,
}