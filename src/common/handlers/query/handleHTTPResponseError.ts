import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import RouterService from "@/common/services/RouterService.ts";
import {NavigateFunction} from "react-router-dom";

interface Params {
    error: Error;
    navigate: NavigateFunction;
    currentURL: URL;
}

export default function ({error, navigate, currentURL}: Params) {
    if (!(error instanceof HttpResponseError)) return;

    if (error.response.status === 403) {
        RouterService.setRedirectPath(currentURL);
        navigate("/auth/login");
    }
}