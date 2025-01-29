import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

export default function useFetchMovieParams() {
    const navigate = useNavigate();
    const {movieID} = useParams<{movieID: string}>();

    if (!movieID) {
        toast.error("Invalid Movie ID.");
        navigate("/admin/movies");
    }

    return {
        movieID,
    };
}