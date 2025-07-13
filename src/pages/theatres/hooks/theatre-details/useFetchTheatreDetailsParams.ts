import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {TheatreDetailsParamSchema} from "@/pages/theatres/schema/params/TheatreDetailsParams.schema.ts";
import {useEffect} from "react";

export default function useFetchTheatreDetailsParams() {
    const navigate = useNavigate();
    const urlParams = useParams<{ theatreID: string, screenID: string }>();
    const {data, success} = TheatreDetailsParamSchema.safeParse(urlParams);

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