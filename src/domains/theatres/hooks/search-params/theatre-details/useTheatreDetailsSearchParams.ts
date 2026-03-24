import {useSearchParams} from "react-router-dom";
import parseSearchParams from "@/common/features/fetch-search-params/parseSearchParams.ts";
import updateSearchParamValue from "@/common/features/fetch-search-params/updateSearchParamValue.ts";
import {
    TheatreDetailsSearchParamSchema
} from "@/domains/theatres/schema/params/TheatreDetailsSearchParamSchema.ts";
import {
    TheatreDetailsSearchParamsDefaults, TheatreDetailsSearchParamsReturns
} from "@/domains/theatres/hooks/search-params/theatre-details/useTheatreDetailsSearchParams.types.ts";

// useTheatreDetailsSearchParam
// ├── uses: useSearchParams (hook)
// ├── calls: fetchParsedSearchParams
// └── calls: setSearchParamValue
//      ├── calls: updateSearchParams
//      └── calls: setSearchParams

/**
 * React hook to manage and synchronize search parameters
 * for the Theatre Details page.
 *
 * - Parses current URL search params using a Zod schema.
 * - Provides setters for individual params (`activeTab`, `screenPage`, etc.).
 * - Applies optional defaults if specified.
 *
 * @param defaultValues Optional default search parameter values.
 * @returns The current parsed search parameters and setter functions.
 */
export default function useTheatreDetailsSearchParams(
    defaultValues: TheatreDetailsSearchParamsDefaults = {}
): TheatreDetailsSearchParamsReturns {
    const [searchParams, setSearchParams] = useSearchParams(defaultValues);

    const params = {searchParams, setSearchParams};
    const rawData = Object.fromEntries(searchParams.entries());
    const parsedSearchParams = parseSearchParams({schema: TheatreDetailsSearchParamSchema, paramStrings: rawData});

    const setActiveTab = (value: string | number) =>
        updateSearchParamValue({key: "activeTab", value, ...params});

    const setScreenPage = (value: string | number) =>
        updateSearchParamValue({key: "screenPage", value, ...params});

    const setScreenPerPage = (value: string | number) =>
        updateSearchParamValue({key: "screenPerPage", value, ...params});

    const setShowingPage = (value: string | number) =>
        updateSearchParamValue({key: "showingPage", value, ...params});

    const setShowingPerPage = (value: string | number) =>
        updateSearchParamValue({key: "showingPerPage", value, ...params});

    return {
        searchParams: parsedSearchParams,
        setActiveTab,
        setScreenPage,
        setScreenPerPage,
        setShowingPage,
        setShowingPerPage,
    };
}