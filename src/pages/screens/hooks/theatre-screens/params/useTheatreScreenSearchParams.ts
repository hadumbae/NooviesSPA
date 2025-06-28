import {TheatreScreenSearchParamSchema} from "@/pages/screens/schema/params/TheatreScreenParams.schema.ts";
import {useSearchParams} from "react-router-dom";
import fetchParsedSearchParams from "@/common/utility/search-params/fetchParsedSearchParams.ts";
import setSearchParamValue from "@/common/utility/search-params/setSearchParamValue.ts";

export default function useTheatreScreenSearchParams() {
    const [searchParams, setSearchParams] = useSearchParams();

    const rawData = Object.fromEntries(searchParams.entries());
    const parsedSearchParams = fetchParsedSearchParams({schema: TheatreScreenSearchParamSchema, raw: rawData});

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