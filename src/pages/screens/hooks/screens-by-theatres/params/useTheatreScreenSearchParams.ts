import {
    ScreenDetailsSearchParams,
    ScreenDetailsSearchParamSchema
} from "@/pages/screens/schema/params/ScreenDetailsSearchParamSchema.ts";
import {useSearchParams} from "react-router-dom";
import fetchParsedSearchParams from "@/common/utility/features/search-params/fetchParsedSearchParams.ts";
import setSearchParamValue from "@/common/utility/features/search-params/setSearchParamValue.ts";

type FetchSearchParams = {
    activeTab?: "seats" | "showings";
    seatPage?: string;
    seatsPerPage?: string;
    showingPage?: string;
    showingsPerPage?: string;
}

type ParamReturns = {
    searchParams: ScreenDetailsSearchParams;
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
    const parsedSearchParams = fetchParsedSearchParams({schema: ScreenDetailsSearchParamSchema, raw: rawData});

    const setActiveTab = (value: string | number) => setSearchParamValue({
        key: "activeTab", value, searchParams, setSearchParams
    });

    const setSeatPage = (value: string | number) => setSearchParamValue({
        key: "seatPage", value, searchParams, setSearchParams
    });

    const setSeatsPerPage = (value: string | number) => setSearchParamValue({
        key: "seatsPerPage", value, searchParams, setSearchParams
    });

    const setShowingPage = (value: string | number) => setSearchParamValue({
        key: "showingPage", value, searchParams, setSearchParams
    });

    const setShowingsPerPage = (value: string | number) => setSearchParamValue({
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