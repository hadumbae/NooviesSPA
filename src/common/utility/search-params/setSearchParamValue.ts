import {NavigateOptions, URLSearchParamsInit} from "react-router-dom";
import updateSearchParams from "@/common/utility/params/updateSearchParams.ts";

type SetValueParams = {
    key: string;
    value: any;
    searchParams: URLSearchParams
    setSearchParams: (nextInit: URLSearchParamsInit, navigateOptions?: NavigateOptions) => void
};

export default function setSearchParamValue(params: SetValueParams) {
    const {key, value, searchParams, setSearchParams} = params;
    const updatedSearchParams = updateSearchParams({searchParams, updateValues: {[key]: value}})
    setSearchParams(updatedSearchParams);
}