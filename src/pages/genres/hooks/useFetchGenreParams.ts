import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

export default function useFetchGenreParams() {
    const navigate = useNavigate();
    const {genreID} = useParams<{genreID: string}>();

    if (!genreID) {
        toast.error("Invalid Genre ID");
        navigate(`/admin/genres`);
    }

    return {
        genreID,
    };
};