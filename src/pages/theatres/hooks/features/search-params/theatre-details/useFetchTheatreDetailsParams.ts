import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {useEffect} from "react";
import {TheatreDetailsRouteParamSchema} from "@/pages/theatres/schema/params/TheatreDetailsRouteParamSchema.ts";

export default function useFetchTheatreDetailsParams() {
    const navigate = useNavigate();
    const urlParams = useParams<{ theatreID: string, screenID: string }>();
    const {data, success} = TheatreDetailsRouteParamSchema.safeParse(urlParams);

    useEffect(
        () => {
            if (!success) {
                toast.error("Invalid URL Params");
                navigate("/admin/theatres");
            }
        },
        [navigate, success, data?.theatreID]
    );

    if (!success || !data || !data?.theatreID) {
        return null;
    }

    return data;
}