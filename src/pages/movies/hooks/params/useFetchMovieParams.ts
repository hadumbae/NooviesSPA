import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {IDStringSchema, ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {useEffect} from "react";

interface ParamReturns {
    movieID: ObjectId;
}

export default function useFetchMovieParams(): ParamReturns | null {
    const navigate = useNavigate();
    const {movieID} = useParams<{ movieID: ObjectId }>();
    const {success, data} = IDStringSchema.safeParse(movieID);

    useEffect(() => {
        if (!success || !data) {
            toast.error("Invalid Movie ID.");
            navigate("/admin/movies");
        }
    }, [success, data, navigate]);

    if (!success || !data) return null;

    return {
        movieID: data!,
    };
}