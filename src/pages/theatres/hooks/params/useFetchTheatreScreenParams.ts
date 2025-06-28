import {useNavigate, useParams} from "react-router-dom";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {TheatreScreenParamsSchema} from "@/pages/screens/schema/params/TheatreScreenParams.schema.ts";

export default function useFetchTheatreScreenParams() {
    const navigate = useNavigate();
    const urlParams = useParams<{ theatreID: ObjectId, screenID: ObjectId }>();

    const {data, success} = TheatreScreenParamsSchema.safeParse(urlParams);

    useEffect(
        () => {
            if (!success) {
                toast.error("Invalid URL Params.");
                navigate("/admin/theatres");
            }
        },
        [navigate, success, data?.theatreID, data?.screenID],
    );

    if (!success || !data || !data?.theatreID || !data?.screenID) {
        return null;
    }

    return data;
}