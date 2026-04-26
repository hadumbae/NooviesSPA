import {
    TheatreScreenDetailsSearchParams,
    TheatreScreenDetailsSearchParamSchema
} from "@/domains/theatre-screens/schema/params/TheatreScreenDetailsSearchParamSchema.ts";
import {useSearchParams} from "react-router-dom";
import parseSearchParams from "@/common/features/fetch-search-params/parseSearchParams.ts";
import updateSearchParamValue from "@/common/features/fetch-search-params/updateSearchParamValue.ts";

type FetchSearchParams = {
    activeTab?: "seats" | "showings";
    seatPage?: string;
    seatsPerPage?: string;
    showingPage?: string;
    showingsPerPage?: string;
}

type ParamReturns = {
    searchParams: TheatreScreenDetailsSearchParams;
    setSearchParams: () => void;
    setActiveTab: (value: string | number) => void;
    setSeatPage: (value: string | number) => void;
    setSeatsPerPage: (value: string | number) => void;
    setShowingPage: (value: string | number) => void;
    setShowingsPerPage: (value: string | number) => void;
}

export default function useTheatreScreenSearchParams(defaultValues?: FetchSearchParams): ParamReturns {
    const [searchParams, setSearchParams] = useSearchParams(defaultValues);

    const rawData = Object.fromEntries(searchParams.entries());
    const parsedSearchParams = parseSearchParams({schema: TheatreScreenDetailsSearchParamSchema, paramStrings: rawData});

    const setActiveTab = (value: string | number) => updateSearchParamValue({
        key: "activeTab", value, searchParams, setSearchParams
    });

    const setSeatPage = (value: string | number) => updateSearchParamValue({
        key: "seatPage", value, searchParams, setSearchParams
    });

    const setSeatsPerPage = (value: string | number) => updateSearchParamValue({
        key: "seatsPerPage", value, searchParams, setSearchParams
    });

    const setShowingPage = (value: string | number) => updateSearchParamValue({
        key: "showingPage", value, searchParams, setSearchParams
    });

    const setShowingsPerPage = (value: string | number) => updateSearchParamValue({
        key: "showingsPerPage", value, searchParams, setSearchParams
    });

    return {
        searchParams: parsedSearchParams,
        setSearchParams,
        setActiveTab,
        setSeatPage,
        setSeatsPerPage,
        setShowingPage,
        setShowingsPerPage,
    };
}