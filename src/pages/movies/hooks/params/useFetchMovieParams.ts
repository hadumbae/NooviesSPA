import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {IDStringSchema, ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {useEffect} from "react";
import useLoggedNavigate from "@/common/hooks/useLoggedNavigate.ts";
import useFetchMovieBrowseParams from "@/pages/movies/hooks/params/client/useFetchMovieBrowseParams.ts";

interface ParamReturns {
    movieID: ObjectId;
}

export default function useFetchMovieParams(): ParamReturns | null {
    const navigate = useLoggedNavigate();
    const {movieID} = useParams<{ movieID: ObjectId }>();
    const {success, data} = IDStringSchema.safeParse(movieID);

    useEffect(() => {
        if (!success || !data) {
            toast.error("Invalid Movie ID.");

            navigate({
                level: "warn",
                to: "/admin/movies",
                component: useFetchMovieBrowseParams.name,
                message: "Failed to fetch movie ID. The ID either does not exist or is not valid.",
            });
        }
    }, [success, data, navigate]);

    if (!success || !data) return null;

    return {
        movieID: data!,
    };
}