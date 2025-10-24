import {
    TheatreDetailsSearchParamsDefaults,
    TheatreDetailsSearchParamsReturns
} from "@/pages/theatres/hooks/theatre-details/search-params/useTheatreDetailsSearchParams.types.ts";
import {useSearchParams} from "react-router-dom";
import fetchParsedSearchParams from "@/common/utility/features/search-params/fetchParsedSearchParams.ts";
import {TheatreDetailsSearchParamSchema} from "@/pages/theatres/schema/params/TheatreDetailsParams.schema.ts";
import setSearchParamValue from "@/common/utility/features/search-params/setSearchParamValue.ts";

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
    const parsedSearchParams = fetchParsedSearchParams({schema: TheatreDetailsSearchParamSchema, raw: rawData});

    const setActiveTab = (value: string | number) =>
        setSearchParamValue({key: "activeTab", value, ...params});

    const setScreenPage = (value: string | number) =>
        setSearchParamValue({key: "screenPage", value, ...params});

    const setScreenPerPage = (value: string | number) =>
        setSearchParamValue({key: "screenPerPage", value, ...params});

    const setShowingPage = (value: string | number) =>
        setSearchParamValue({key: "showingPage", value, ...params});

    const setShowingPerPage = (value: string | number) =>
        setSearchParamValue({key: "showingPerPage", value, ...params});

    return {
        searchParams: parsedSearchParams,
        setActiveTab,
        setScreenPage,
        setScreenPerPage,
        setShowingPage,
        setShowingPerPage,
    };
}