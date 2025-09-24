import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import useLoggedNavigate from "@/common/hooks/useLoggedNavigate.ts";

export default function useFetchGenreParams() {
    const navigate = useLoggedNavigate();
    const {genreID} = useParams<{genreID: string}>();

    if (!genreID) {
        toast.error("Invalid Genre ID");

        navigate({
            to: `/admin/genres`,
            component: useFetchGenreParams.name,
            message: "Failed to fetch genre ID. The ID may be missing or invalid.",
        });
    }

    return {
        genreID,
    };
};