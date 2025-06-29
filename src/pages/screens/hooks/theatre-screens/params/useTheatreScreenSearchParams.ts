import {TheatreScreenSearchParamsSchema} from "@/pages/screens/schema/params/TheatreScreenParams.schema.ts";
import {useSearchParams} from "react-router-dom";
import fetchParsedSearchParams from "@/common/utility/search-params/fetchParsedSearchParams.ts";
import setSearchParamValue from "@/common/utility/search-params/setSearchParamValue.ts";
import {TheatreScreenSearchParams} from "@/pages/screens/schema/params/TheatreScreenParams.types.ts";

type FetchSearchParams = {
    activeTab?: "seats" | "showings";
    seatPage?: string;
    seatsPerPage?: string;
    showingPage?: string;
    showingsPerPage?: string;
}

type ParamReturns = {
    searchParams: TheatreScreenSearchParams;
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
    const parsedSearchParams = fetchParsedSearchParams({schema: TheatreScreenSearchParamsSchema, raw: rawData});

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